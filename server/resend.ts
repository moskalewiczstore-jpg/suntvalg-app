import { Resend } from 'resend';

const FROM_EMAIL = 'hello@suntvalg.app';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not found in environment');
  }
  return new Resend(apiKey);
}

type EmailContent = {
  subject: string;
  greeting: string;
  welcomeTitle: string;
  badge: string;
  intro: string;
  whatNext: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  callToAction: string;
  buttonText: string;
  signoff: string;
  team: string;
  copyright: string;
};

const emailTranslations: Record<string, EmailContent> = {
  no: {
    subject: "Velkommen til SuntValg venteliste! 🌱",
    greeting: "Hei!",
    welcomeTitle: "🌱 Velkommen til SuntValg!",
    badge: "Du er på ventelisten",
    intro: "Takk for at du ble med på ventelisten til SuntValg – appen som hjelper deg med sunnere matvalg.",
    whatNext: "Hva skjer videre?",
    bullet1: "Vi holder deg oppdatert om utviklingen",
    bullet2: "Du får tidlig tilgang til appen",
    bullet3: "Du blir blant de første som kan bruke vår AI-assistent",
    callToAction: "I mellomtiden kan du dele dine forventninger med oss – bare svar på denne e-posten!",
    buttonText: "Besøk nettsiden vår",
    signoff: "Vi sees snart,",
    team: "SuntValg-teamet",
    copyright: "© 2026 SuntValg AS. Alle rettigheter forbeholdt."
  },
  en: {
    subject: "Welcome to SuntValg waitlist! 🌱",
    greeting: "Hi there!",
    welcomeTitle: "🌱 Welcome to SuntValg!",
    badge: "You're on the waitlist",
    intro: "Thank you for joining the SuntValg waitlist – the app that helps you make healthier food choices.",
    whatNext: "What's next?",
    bullet1: "We'll keep you updated on our progress",
    bullet2: "You'll get early access to the app",
    bullet3: "You'll be among the first to use our AI nutrition assistant",
    callToAction: "In the meantime, feel free to share your expectations with us – just reply to this email!",
    buttonText: "Visit our website",
    signoff: "See you soon,",
    team: "The SuntValg Team",
    copyright: "© 2026 SuntValg AS. All rights reserved."
  },
  pl: {
    subject: "Witaj na liście oczekujących SuntValg! 🌱",
    greeting: "Cześć!",
    welcomeTitle: "🌱 Witaj w SuntValg!",
    badge: "Jesteś na liście oczekujących",
    intro: "Dziękujemy, że dołączyłeś do listy oczekujących SuntValg – aplikacji, która pomaga w świadomych wyborach żywieniowych.",
    whatNext: "Co dalej?",
    bullet1: "Będziemy Cię na bieżąco informować o postępach",
    bullet2: "Dostaniesz wczesny dostęp do aplikacji",
    bullet3: "Jako jeden z pierwszych będziesz mógł korzystać z AI asystenta żywieniowego",
    callToAction: "Tymczasem możesz podzielić się z nami swoimi oczekiwaniami – po prostu odpowiedz na tego maila!",
    buttonText: "Odwiedź naszą stronę",
    signoff: "Do zobaczenia wkrótce,",
    team: "Zespół SuntValg",
    copyright: "© 2026 SuntValg AS. Wszystkie prawa zastrzeżone."
  },
  ru: {
    subject: "Добро пожаловать в список ожидания SuntValg! 🌱",
    greeting: "Привет!",
    welcomeTitle: "🌱 Добро пожаловать в SuntValg!",
    badge: "Вы в списке ожидания",
    intro: "Спасибо, что присоединились к списку ожидания SuntValg – приложения, которое помогает делать здоровый выбор продуктов.",
    whatNext: "Что дальше?",
    bullet1: "Мы будем держать вас в курсе наших успехов",
    bullet2: "Вы получите ранний доступ к приложению",
    bullet3: "Вы будете среди первых, кто сможет использовать нашего AI-ассистента по питанию",
    callToAction: "А пока вы можете поделиться с нами своими ожиданиями – просто ответьте на это письмо!",
    buttonText: "Посетите наш сайт",
    signoff: "До скорой встречи,",
    team: "Команда SuntValg",
    copyright: "© 2026 SuntValg AS. Все права защищены."
  }
};

function getEmailContent(language: string): EmailContent {
  return emailTranslations[language] || emailTranslations['no'];
}

export async function sendWelcomeEmail(recipientEmail: string, language: string = 'no') {
  const client = getResendClient();
  const content = getEmailContent(language);
  
  try {
    const { data, error } = await client.emails.send({
      from: FROM_EMAIL,
      to: recipientEmail,
      subject: content.subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
              .content { background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              h1 { margin: 0; font-size: 28px; }
              .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
              .button { display: inline-block; background: #22C55E; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${content.welcomeTitle}</h1>
                <div class="badge">${content.badge}</div>
              </div>
              <div class="content">
                <p>${content.greeting}</p>
                <p>${content.intro}</p>
                
                <p><strong>${content.whatNext}</strong></p>
                <ul>
                  <li>${content.bullet1}</li>
                  <li>${content.bullet2}</li>
                  <li>${content.bullet3}</li>
                </ul>
                
                <p>${content.callToAction}</p>
                
                <div style="text-align: center;">
                  <a href="https://suntvalg.app" class="button">${content.buttonText}</a>
                </div>
                
                <div class="footer">
                  <p>${content.signoff}<br><strong>${content.team}</strong></p>
                  <p style="font-size: 12px; color: #999;">${content.copyright}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    console.log(`Welcome email sent successfully in ${language}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    return { success: false, error };
  }
}
