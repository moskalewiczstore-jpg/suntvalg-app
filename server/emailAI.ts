import OpenAI from "openai";
import { db } from "./db";
import { emailConversations, emailMessages, waitlist } from "@shared/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const SYSTEM_PROMPTS: Record<string, string> = {
  no: `Du er en vennlig og profesjonell kundeserviceassistent for SuntValg, en norsk ernæringsapp som hjelper folk med å skanne produkter og finne sunnere alternativer.

Viktige punkter om SuntValg:
- Appen er under utvikling og lanseres snart
- Brukere kan skanne produkter for å se næringsinformasjon
- AI-en foreslår sunnere alternativer basert på brukerens preferanser
- Appen er gratis å bruke med premium-funksjoner tilgjengelig
- Vi respekterer personvernet og følger GDPR

Svar alltid på norsk, vær høflig og hjelpsom. Hvis du ikke vet svaret, vær ærlig og si at teamet vårt vil se nærmere på spørsmålet.`,

  en: `You are a friendly and professional customer service assistant for SuntValg, a Norwegian nutrition app that helps people scan products and find healthier alternatives.

Key points about SuntValg:
- The app is currently in development and launching soon
- Users can scan products to see nutritional information
- AI suggests healthier alternatives based on user preferences
- The app is free to use with premium features available
- We respect privacy and comply with GDPR

Always respond in English, be polite and helpful. If you don't know the answer, be honest and say that our team will look into the question.`,

  pl: `Jesteś przyjaznym i profesjonalnym asystentem obsługi klienta dla SuntValg, norweskiej aplikacji żywieniowej, która pomaga ludziom skanować produkty i znajdować zdrowsze alternatywy.

Kluczowe informacje o SuntValg:
- Aplikacja jest w trakcie rozwoju i zostanie wkrótce uruchomiona
- Użytkownicy mogą skanować produkty, aby zobaczyć informacje o wartościach odżywczych
- AI sugeruje zdrowsze alternatywy na podstawie preferencji użytkownika
- Aplikacja jest darmowa z dostępnymi funkcjami premium
- Szanujemy prywatność i przestrzegamy RODO

Zawsze odpowiadaj po polsku, bądź uprzejmy i pomocny. Jeśli nie znasz odpowiedzi, bądź szczery i powiedz, że nasz zespół przyjrzy się pytaniu.`,

  ru: `Вы дружелюбный и профессиональный ассистент службы поддержки клиентов SuntValg, норвежского приложения для питания, которое помогает людям сканировать продукты и находить более здоровые альтернативы.

Ключевые моменты о SuntValg:
- Приложение находится в разработке и скоро будет запущено
- Пользователи могут сканировать продукты для просмотра информации о питательной ценности
- ИИ предлагает более здоровые альтернативы на основе предпочтений пользователя
- Приложение бесплатное с доступными премиум-функциями
- Мы уважаем конфиденциальность и соблюдаем GDPR

Всегда отвечайте на русском языке, будьте вежливы и полезны. Если вы не знаете ответа, будьте честны и скажите, что наша команда рассмотрит вопрос.`,
};

export async function processIncomingEmail(
  fromEmail: string,
  subject: string,
  content: string
): Promise<void> {
  console.log(`Processing incoming email from: ${fromEmail}`);

  // Check if user is in waitlist to get their language preference
  const [waitlistEntry] = await db
    .select()
    .from(waitlist)
    .where(eq(waitlist.email, fromEmail))
    .limit(1);

  const language = waitlistEntry?.language || "en";
  console.log(`User language: ${language}`);

  // Find or create conversation
  let [conversation] = await db
    .select()
    .from(emailConversations)
    .where(eq(emailConversations.email, fromEmail))
    .limit(1);

  if (!conversation) {
    const [newConversation] = await db
      .insert(emailConversations)
      .values({
        email: fromEmail,
        language,
        waitlistId: waitlistEntry?.id || null,
      })
      .returning();
    conversation = newConversation;
  }

  // Save incoming message
  await db.insert(emailMessages).values({
    conversationId: conversation.id,
    direction: "inbound",
    subject,
    content,
  });

  // Get conversation history for context
  const history = await db
    .select()
    .from(emailMessages)
    .where(eq(emailMessages.conversationId, conversation.id))
    .orderBy(emailMessages.createdAt);

  // Build messages for AI
  const aiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en },
  ];

  for (const msg of history) {
    aiMessages.push({
      role: msg.direction === "inbound" ? "user" : "assistant",
      content: msg.content,
    });
  }

  // Generate AI response
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: aiMessages,
    max_tokens: 1000,
  });

  const aiReply = response.choices[0]?.message?.content || "";
  console.log(`AI generated response for ${fromEmail}`);

  // Save outgoing message
  await db.insert(emailMessages).values({
    conversationId: conversation.id,
    direction: "outbound",
    subject: `Re: ${subject}`,
    content: aiReply,
  });

  // Send reply via Resend
  await resend.emails.send({
    from: "SuntValg Support <hello@suntvalg.app>",
    to: fromEmail,
    subject: `Re: ${subject}`,
    text: aiReply,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://suntvalg.app/suntvalg-logo.svg" alt="SuntValg" style="height: 40px;" />
        </div>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">
${aiReply}
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
          <p>SuntValg - Din personlige ernæringsassistent</p>
          <p>🥗 suntvalg.app</p>
        </div>
      </div>
    `,
  });

  console.log(`Reply sent to ${fromEmail}`);
}
