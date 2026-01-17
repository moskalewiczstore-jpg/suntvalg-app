import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Norwegian (Bokmål)
const no = {
  translation: {
    nav: {
      features: "Funksjoner",
      howItWorks: "Hvordan det fungerer",
      stories: "Historier",
      pricing: "Pris",
      download: "Bli med på ventelisten"
    },
    hero: {
      badge: "✨ Norges smarteste mat-app",
      title_start: "Sunnere valg",
      title_end: "gjort enkelt",
      subtitle: "Skann matvarer og forstå hva du spiser. Få en sunnhetsvurdering og se hva ingrediensene betyr. Din personlige guide til et bedre kosthold.",
      cta_primary: "Bli med på ventelisten",
      cta_secondary: "Les mer",
      users: "Brukt av over 10,000 nordmenn",
      coming_soon: "Kommer snart til App Store og Google Play"
    },
    features: {
      title: "Alt du trenger for et sunnere liv",
      subtitle: "Fra planlegging til handletur og matlaging - SuntValg er med deg hele veien.",
      scan: { title: "Skann produkter", desc: "Skann strekkoden og få umiddelbart en sunnhetsvurdering fra 0-100." },
      ingredients: { title: "Forstå ingredienser", desc: "AI analyserer ingrediensene og forklarer hva som er bra og hva som bør unngås." },
      alternatives: { title: "Sammenlign produkter", desc: "Se sunnhetsvurderinger og sammenlign produkter for å finne det beste valget." },
      mealplan: { title: "Planlegg måltider", desc: "Oppskrifter tilpasset din diett, preferanser og budsjett." },
      shoppinglist: { title: "Smarte handlelister", desc: "Kategoriserer produkter og hjelper deg å ikke glemme noe." },
      ai: { title: "Snakk med SunnAI", desc: "Din personlige AI-assistent som svarer på alle spørsmål om mat og helse." },
      share: { title: "Del oppskrifter", desc: "Send oppskrifter til familie og venner med ett klikk." },
      history: { title: "Spor historikk", desc: "Se hva du har spist, hva du liker, og hva som kan forbedres." }
    },
    howItWorks: {
      title: "Slik fungerer det",
      subtitle: "Tre enkle steg til en sunnere hverdag",
      step1: { title: "Skann", desc: "Bruk kameraet på mobilen til å skanne strekkoden på matvaren i butikken eller hjemme." },
      step2: { title: "Forstå", desc: "Få en enkel forklaring på hva produktet inneholder og hvor sunt det faktisk er." },
      step3: { title: "Velg sunnere", desc: "Se bedre alternativer umiddelbart og ta informerte valg for din helse." }
    },
    stories: {
      title: "Våre brukerhistorier",
      subtitle: "Se hvordan SuntValg endrer livene til vanlige folk",
      ingrid: { quote: "Sønnen min viste meg denne appen. Nå deler jeg oppskrifter på kjøttkaker med barnebarnet mitt Oda med ett klikk. Det er fantastisk at oppskriftene mine lever videre!", role: "Bestemor" },
      magnus: { quote: "Jeg sparte 400-500 kr i måneden ved å bruke handlelistene og planlegge bedre. SunnAI hjelper meg å bruke det jeg allerede har i kjøleskapet.", role: "Småbarnsfar" },
      kari: { quote: "Barna mine har allergier, og før brukte jeg timer på å lese etiketter. Nå skanner jeg bare, og appen advarer meg om allergener. Handleturen tar nå 40 minutter istedenfor 2 timer.", role: "Tobarnsmor" },
      einar: { quote: "Etter hjerteinfarktet må jeg passe på salt og fett. SuntValg fungerer som en ernæringsfysiolog i lomma mi og gir meg trygghet når jeg handler.", role: "Pensjonist" }
    },
    pricing: {
      title: "Velg det abonnementet som passer deg",
      subtitle: "Få full tilgang til SuntValg Premium",
      monthly_plan: "Månedsplan",
      monthly_price: "79 NOK",
      monthly_subtext: "per måned",
      monthly_cta: "Kjøp månedlig",
      annual_plan: "Årsplan",
      annual_price: "759 NOK",
      annual_subtext: "20% billigere",
      annual_badge: "Godt tilbud – 20% billigere",
      annual_cta: "Kjøp årlig",
      features: {
        unlimited_scans: "Ubegrenset skanning og historikk",
        ai_assistant: "Full tilgang til SunnAI-assistenten",
        health_alternatives: "Sunnere alternativer og diet-filtre",
        smart_planning: "Ubegrensede oppskrifter og handlelister"
      }
    },
    faq: {
      title: "Ofte stilte spørsmål",
      subtitle: "Lurer du på noe? Vi har svarene.",
      q1: "Er SuntValg gratis å bruke?",
      a1: "Ja, vi har en gratis versjon som lar deg skanne produkter og se sunnhetsvurderingen. Premium-versjonen gir deg tilgang til ubegrensede skanninger, måltidsplanlegging og SunnAI.",
      q2: "Hvordan fungerer helsescoren?",
      a2: "Vi bruker en vitenskapelig basert algoritme som vurderer næringsinnholdet (sukker, salt, fett, proteiner, fiber) og tilsetningsstoffer for å gi en score fra 0 til 100.",
      q3: "Kan jeg bruke appen med allergier?",
      a3: "Absolutt! Du kan legge inn dine allergier og preferanser i profilen din, og appen vil varsle deg hvis et produkt inneholder noe du ikke tåler.",
      q4: "Er appen tilgjengelig på norsk?",
      a4: "Ja, SuntValg er utviklet med fokus på det norske markedet og er fullstendig på norsk (bokmål). Vi støtter også engelsk, polsk og russisk."
    },
    waitlist: {
      title: "Bli den første som får vite det!",
      subtitle: "Bli med på ventelisten og få beskjed når vi lanserer.",
      email_placeholder: "Din e-postadresse",
      button: "Varsle meg ved lansering",
      footer_text: "SuntValg - Sunnere valg gjort enkelt"
    },
    footer: {
      follow_us: "Følg oss for oppdateringer og sunne tips!"
    }
  }
};

// English
const en = {
  translation: {
    nav: {
      features: "Features",
      howItWorks: "How it works",
      stories: "Stories",
      pricing: "Pricing",
      download: "Join Waitlist"
    },
    hero: {
      badge: "✨ Norway's smartest food app",
      title_start: "Healthier choices",
      title_end: "made easy",
      subtitle: "Scan groceries and understand what you eat. Get a health rating and see what the ingredients mean. Your personal guide to a better diet.",
      cta_primary: "Join Waitlist",
      cta_secondary: "Learn more",
      users: "Used by over 10,000 Norwegians",
      coming_soon: "Coming soon to App Store and Google Play"
    },
    features: {
      title: "Everything you need for a healthier life",
      subtitle: "From planning to shopping and cooking - SuntValg is with you all the way.",
      scan: { title: "Scan products", desc: "Scan the barcode and instantly get a health rating from 0-100." },
      ingredients: { title: "Understand ingredients", desc: "AI analyzes ingredients and explains what is good and what to avoid." },
      alternatives: { title: "Compare products", desc: "See health ratings and compare products to find the best choice for you." },
      mealplan: { title: "Plan meals", desc: "Recipes adapted to your diet, preferences, and budget." },
      shoppinglist: { title: "Smart shopping lists", desc: "Categorizes products and helps you not forget anything." },
      ai: { title: "Talk to SunnAI", desc: "Your personal AI assistant answering all questions about food and health." },
      share: { title: "Share recipes", desc: "Send recipes to family and friends with one click." },
      history: { title: "Track history", desc: "See what you ate, what you like, and what can be improved." }
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Three simple steps to a healthier everyday life",
      step1: { title: "Scan", desc: "Use your mobile camera to scan the barcode on food items in the store or at home." },
      step2: { title: "Understand", desc: "Get a simple explanation of what the product contains and how healthy it actually is." },
      step3: { title: "Choose healthier", desc: "See better alternatives instantly and make informed choices for your health." }
    },
    stories: {
      title: "Our User Stories",
      subtitle: "See how SuntValg changes the lives of ordinary people",
      ingrid: { quote: "My son showed me this app because he uses it himself. When the holidays were approaching, I wanted to share my meatball recipes with my granddaughter Oda. In SuntValg, I added my recipes, and with one click sent them to Oda. Now the whole family cooks from my recipes, even when I'm not there.", role: "Grandmother" },
      magnus: { quote: "I wasted a lot of food and money because I bought without a plan. Now I have a list in SuntValg of what I have in the fridge, the app suggests recipes from what I already have, and the AI assistant helps plan weekly shopping. I save 400-500 NOK monthly and don't throw away food. My wife is delighted!", role: "Young Dad" },
      kari: { quote: "My children have food intolerances. Previously, I spent hours reading labels in the store. Now I scan a product and immediately see if it contains allergens. The app even suggests safe alternatives. Shopping that used to take 2 hours, I now do in 40 minutes.", role: "Mom of two" },
      einar: { quote: "After a heart attack, the doctor told me to watch out for salt and saturated fats. SuntValg shows me exactly how much is in each product and warns when there is too much. I feel safe shopping. It's like having a nutritionist in my pocket.", role: "Pensioner" }
    },
    pricing: {
      title: "Choose the plan that suits you",
      subtitle: "Get full access to SuntValg Premium",
      monthly_plan: "Monthly plan",
      monthly_price: "79 NOK",
      monthly_subtext: "per month",
      monthly_cta: "Buy monthly",
      annual_plan: "Annual plan",
      annual_price: "759 NOK",
      annual_subtext: "20% cheaper",
      annual_badge: "Great offer - 20% cheaper",
      annual_cta: "Buy yearly",
      features: {
        unlimited_scans: "Unlimited scanning and history",
        ai_assistant: "Full access to SunnAI assistant",
        health_alternatives: "Healthier alternatives and diet filters",
        smart_planning: "Unlimited recipes and shopping lists"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Wondering about something? We have the answers.",
      q1: "Is SuntValg free to use?",
      a1: "Yes, we have a free version that lets you scan products and see the health rating. The Premium version gives you access to unlimited scans, meal planning, and SunnAI.",
      q2: "How does the health score work?",
      a2: "We use a scientifically based algorithm that evaluates nutritional content (sugar, salt, fat, proteins, fiber) and additives to give a score from 0 to 100.",
      q3: "Can I use the app with allergies?",
      a3: "Absolutely! You can enter your allergies and preferences in your profile, and the app will notify you if a product contains something you cannot tolerate.",
      q4: "Is the app available in other languages?",
      a4: "Yes, SuntValg supports Norwegian, English, Polish, and Russian."
    },
    waitlist: {
      title: "Be the first to know!",
      subtitle: "Join the waitlist and get notified when we launch.",
      email_placeholder: "Your email address",
      button: "Notify me at launch",
      footer_text: "SuntValg - Healthier choices made easy"
    },
    footer: {
      follow_us: "Follow us for updates and healthy tips!"
    }
  }
};

// Polish
const pl = {
  translation: {
    nav: {
      features: "Funkcje",
      howItWorks: "Jak to działa",
      stories: "Historie",
      pricing: "Cennik",
      download: "Dołącz do listy"
    },
    hero: {
      badge: "✨ Najmądrzejsza aplikacja żywieniowa w Norwegii",
      title_start: "Zdrowsze wybory",
      title_end: "stały się proste",
      subtitle: "Skanuj produkty i zrozum co jesz. Sprawdź ocenę zdrowotną i poznaj znaczenie składników. Twój osobisty przewodnik po lepszej diecie.",
      cta_primary: "Dołącz do listy oczekujących",
      cta_secondary: "Dowiedz się więcej",
      users: "Używane przez ponad 10,000 Norwegów",
      coming_soon: "Wkrótce w App Store i Google Play"
    },
    features: {
      title: "Wszystko czego potrzebujesz dla zdrowszego życia",
      subtitle: "Od planowania po zakupy i gotowanie - SuntValg jest z Tobą na każdym kroku.",
      scan: { title: "Skanuj produkty", desc: "Zeskanuj kod kreskowy i natychmiast zobacz ocenę zdrowotną od 0 do 100." },
      ingredients: { title: "Zrozum skład", desc: "AI analizuje składniki i wyjaśnia co jest dobre, a co szkodliwe." },
      alternatives: { title: "Porównuj produkty", desc: "Zobacz oceny zdrowotne i porównaj produkty, aby wybrać najlepszą opcję." },
      mealplan: { title: "Planuj posiłki", desc: "Przepisy dopasowane do Twojej diety, preferencji i budżetu." },
      shoppinglist: { title: "Inteligentne listy zakupów", desc: "Kategoryzuje produkty i pomaga o niczym nie zapomnieć." },
      ai: { title: "Rozmawiaj z SunnAI", desc: "Twój osobisty asystent AI, który odpowie na każde pytanie o żywność i zdrowie." },
      share: { title: "Dziel się przepisami", desc: "Wyślij przepisy rodzinie lub znajomym jednym kliknięciem." },
      history: { title: "Śledź historię", desc: "Zobacz co jadłeś, co lubisz i co warto zmienić." }
    },
    howItWorks: {
      title: "Jak to działa",
      subtitle: "Trzy proste kroki do zdrowszej codzienności",
      step1: { title: "Zeskanuj", desc: "Użyj aparatu w telefonie, aby zeskanować kod kreskowy produktu w sklepie lub w domu." },
      step2: { title: "Poznaj", desc: "Otrzymaj proste wyjaśnienie co zawiera produkt i jak bardzo jest zdrowy." },
      step3: { title: "Wybierz zdrowiej", desc: "Zobacz lepsze alternatywy natychmiast i podejmuj świadome decyzje dla swojego zdrowia." }
    },
    stories: {
      title: "Historie naszych użytkowników",
      subtitle: "Zobacz jak SuntValg zmienia życie zwykłych ludzi",
      ingrid: { quote: "Mój syn pokazał mi tę aplikację bo sam jej używa. Kiedy zbliżały się święta, chciałam podzielić się z wnuczką Odą moimi przepisami na klopsiki. W SuntValg dodałam moje przepisy, a potem jednym kliknięciem wysłałam je Odzie. Teraz cała rodzina gotuje z moich przepisów, nawet jak mnie nie ma.", role: "Babcia Ingrid" },
      magnus: { quote: "Marnowałem mnóstwo jedzenia i pieniędzy bo kupowałem bez planu. Teraz mam w SuntValg listę co mam w lodówce, aplikacja podpowiada mi przepisy z tego co już mam, a asystent AI pomaga zaplanować tygodniowe zakupy. Oszczędzam 400-500 zł miesięcznie i nie wyrzucam jedzenia. Żona jest zachwycona!", role: "Młody tata" },
      kari: { quote: "Moje dzieci mają nietolerancje pokarmowe. Wcześniej godzinami czytałam etykiety w sklepie. Teraz skanuję produkt i od razu widzę czy zawiera alergeny. Aplikacja nawet podpowiada bezpieczne alternatywy. Zakupy które zajmowały 2 godziny, teraz robię w 40 minut.", role: "Mama dwójki dzieci" },
      einar: { quote: "Po zawale lekarz kazał mi uważać na sól i tłuszcze nasycone. SuntValg pokazuje mi dokładnie ile tego jest w każdym produkcie i ostrzega gdy jest za dużo. Czuję się bezpiecznie robiąc zakupy. To jak mieć dietetyka w kieszeni.", role: "Emeryt" }
    },
    pricing: {
      title: "Wybierz plan, który najbardziej Ci odpowiada",
      subtitle: "Uzyskaj pełny dostęp do SuntValg Premium",
      monthly_plan: "Miesięczny plan",
      monthly_price: "79 NOK",
      monthly_subtext: "na miesiąc",
      monthly_cta: "Kup miesięczny",
      annual_plan: "Roczny plan",
      annual_price: "759 NOK",
      annual_subtext: "20% taniej",
      annual_badge: "Dobra oferta – 20% taniej",
      annual_cta: "Kup roczny",
      features: {
        unlimited_scans: "Nielimitowane skanowanie i historia",
        ai_assistant: "Pełny dostęp do asystenta SunnAI",
        health_alternatives: "Zdrowsze alternatywy i filtry diet",
        smart_planning: "Nielimitowane przepisy i listy zakupów"
      }
    },
    faq: {
      title: "Często zadawane pytania",
      subtitle: "Masz pytania? Mamy odpowiedzi.",
      q1: "Czy SuntValg jest darmowy?",
      a1: "Tak, mamy darmową wersję, która pozwala skanować produkty i widzieć ocenę zdrowotną. Wersja Premium daje dostęp do nielimitowanych skanów, planowania posiłków i SunnAI.",
      q2: "Jak działa ocena zdrowotna?",
      a2: "Używamy algorytmu opartego na nauce, który ocenia zawartość odżywczą (cukier, sól, tłuszcz, białko, błonnik) i dodatki, aby dać wynik od 0 do 100.",
      q3: "Czy mogę używać aplikacji z alergiami?",
      a3: "Absolutnie! Możesz wpisać swoje alergie i preferencje w profilu, a aplikacja powiadomi Cię, jeśli produkt zawiera coś, czego nie tolerujesz.",
      q4: "Czy aplikacja jest dostępna w innych językach?",
      a4: "Tak, SuntValg obsługuje norweski, angielski, polski i rosyjski."
    },
    waitlist: {
      title: "Bądź pierwszy!",
      subtitle: "Dołącz do listy oczekujących i otrzymaj powiadomienie o premierze.",
      email_placeholder: "Twój adres email",
      button: "Powiadom mnie o premierze",
      footer_text: "SuntValg - Zdrowsze wybory stały się proste"
    },
    footer: {
      follow_us: "Obserwuj nas po aktualizacje i zdrowe porady!"
    }
  }
};

// Russian
const ru = {
  translation: {
    nav: {
      features: "Функции",
      howItWorks: "Как это работает",
      stories: "Истории",
      pricing: "Цены",
      download: "В лист ожидания"
    },
    hero: {
      badge: "✨ Самое умное приложение о еде в Норвегии",
      title_start: "Здоровый выбор",
      title_end: "стал проще",
      subtitle: "Сканируйте продукты и понимайте, что вы едите. Получите оценку здоровья и узнайте, что означают ингредиенты. Ваш личный гид по лучшему питанию.",
      cta_primary: "Присоединиться к листу ожидания",
      cta_secondary: "Узнать больше",
      users: "Используется более чем 10,000 норвежцев",
      coming_soon: "Скоро в App Store и Google Play"
    },
    features: {
      title: "Всё необходимое для здоровой жизни",
      subtitle: "От планирования до покупок и готовки - SuntValg с вами на каждом шагу.",
      scan: { title: "Сканируйте продукты", desc: "Сканируйте штрих-код и мгновенно получайте оценку здоровья от 0 до 100." },
      ingredients: { title: "Понимайте состав", desc: "ИИ анализирует ингредиенты и объясняет, что полезно, а чего стоит избегать." },
      alternatives: { title: "Сравнивайте продукты", desc: "Смотрите оценки здоровья и сравнивайте продукты, чтобы выбрать лучший вариант." },
      mealplan: { title: "Планируйте питание", desc: "Рецепты, адаптированные к вашей диете, предпочтениям и бюджету." },
      shoppinglist: { title: "Умные списки покупок", desc: "Категоризирует продукты и помогает ничего не забыть." },
      ai: { title: "Общайтесь с SunnAI", desc: "Ваш личный ИИ-ассистент, отвечающий на все вопросы о еде и здоровье." },
      share: { title: "Делитесь рецептами", desc: "Отправляйте рецепты семье и друзьям одним кликом." },
      history: { title: "Отслеживайте историю", desc: "Смотрите, что вы ели, что вам нравится и что стоит изменить." }
    },
    howItWorks: {
      title: "Как это работает",
      subtitle: "Три простых шага к более здоровой повседневной жизни",
      step1: { title: "Сканируйте", desc: "Используйте камеру телефона для сканирования штрих-кода продукта в магазине или дома." },
      step2: { title: "Понимайте", desc: "Получите простое объяснение того, что содержит продукт и насколько он полезен." },
      step3: { title: "Выбирайте здоровое", desc: "Мгновенно видьте лучшие альтернативы и принимайте осознанные решения для своего здоровья." }
    },
    stories: {
      title: "Истории наших пользователей",
      subtitle: "Посмотрите, как SuntValg меняет жизни обычных людей",
      ingrid: { quote: "Мой сын показал мне это приложение, потому что сам им пользуется. Когда приближались праздники, я хотела поделиться с внучкой Одой своими рецептами фрикаделек. В SuntValg я добавила свои рецепты и одним кликом отправила их Оде. Теперь вся семья готовит по моим рецептам, даже когда меня нет рядом.", role: "Бабушка Ингрид" },
      magnus: { quote: "Я тратил много еды и денег, потому что покупал без плана. Теперь у меня в SuntValg есть список того, что в холодильнике, приложение подсказывает рецепты из того, что уже есть, а ИИ-ассистент помогает планировать покупки на неделю. Я экономлю 400-500 крон в месяц и не выбрасываю еду. Жена в восторге!", role: "Молодой папа" },
      kari: { quote: "У моих детей пищевая непереносимость. Раньше я часами читала этикетки в магазине. Теперь я сканирую продукт и сразу вижу, содержит ли он аллергены. Приложение даже подсказывает безопасные альтернативы. Покупки, которые занимали 2 часа, теперь я делаю за 40 минут.", role: "Мама двоих детей" },
      einar: { quote: "После инфаркта врач велел мне следить за солью и насыщенными жирами. SuntValg точно показывает, сколько их в каждом продукте, и предупреждает, если их слишком много. Я чувствую себя в безопасности, делая покупки. Это как иметь диетолога в кармане.", role: "Пенсионер" }
    },
    pricing: {
      title: "Выберите план, который подходит вам",
      subtitle: "Получите полный доступ к SuntValg Premium",
      monthly_plan: "Месячный план",
      monthly_price: "79 NOK",
      monthly_subtext: "в месяц",
      monthly_cta: "Купить месячный",
      annual_plan: "Годовой план",
      annual_price: "759 NOK",
      annual_subtext: "на 20% дешевле",
      annual_badge: "Выгодное предложение - 20% скидка",
      annual_cta: "Купить годовой",
      features: {
        unlimited_scans: "Безлимитное сканирование и история",
        ai_assistant: "Полный доступ к ассистенту SunnAI",
        health_alternatives: "Здоровые альтернативы и диетические фильтры",
        smart_planning: "Безлимитные рецепты и списки покупок"
      }
    },
    faq: {
      title: "Часто задаваемые вопросы",
      subtitle: "Есть вопросы? У нас есть ответы.",
      q1: "SuntValg бесплатен?",
      a1: "Да, у нас есть бесплатная версия, позволяющая сканировать продукты и видеть оценку здоровья. Версия Premium дает доступ к безлимитному сканированию, планированию питания и SunnAI.",
      q2: "Как работает оценка здоровья?",
      a2: "Мы используем научно обоснованный алгоритм, который оценивает питательную ценность (сахар, соль, жир, белки, клетчатка) и добавки, чтобы дать оценку от 0 до 100.",
      q3: "Могу ли я использовать приложение при аллергии?",
      a3: "Абсолютно! Вы можете указать свои аллергии и предпочтения в профиле, и приложение уведомит вас, если продукт содержит что-то, что вы не переносите.",
      q4: "Доступно ли приложение на других языках?",
      a4: "Да, SuntValg поддерживает норвежский, английский, польский и русский языки."
    },
    waitlist: {
      title: "Будьте первыми!",
      subtitle: "Присоединяйтесь к листу ожидания и получите уведомление о запуске.",
      email_placeholder: "Ваш email",
      button: "Сообщить мне о запуске",
      footer_text: "SuntValg - Здоровый выбор стал проще"
    },
    footer: {
      follow_us: "Следите за нами для обновлений и полезных советов!"
    }
  }
};

// Swedish
const sv = {
  translation: {
    nav: {
      features: "Funktioner",
      howItWorks: "Hur det fungerar",
      stories: "Berättelser",
      pricing: "Pris",
      download: "Gå med i väntelistan"
    },
    hero: {
      badge: "✨ Norges smartaste matapp",
      title_start: "Hälsosammare val",
      title_end: "gjort enkelt",
      subtitle: "Skanna matvaror och förstå vad du äter. Få ett hälsobetyg och se vad ingredienserna betyder. Din personliga guide till en bättre kost.",
      cta_primary: "Gå med i väntelistan",
      cta_secondary: "Läs mer",
      users: "Används av över 10 000 norrmän",
      coming_soon: "Kommer snart till App Store och Google Play"
    },
    features: {
      title: "Allt du behöver för ett hälsosammare liv",
      subtitle: "Från planering till shopping och matlagning - SuntValg är med dig hela vägen.",
      scan: { title: "Skanna produkter", desc: "Skanna streckkoden och få omedelbart ett hälsobetyg från 0-100." },
      ingredients: { title: "Förstå ingredienser", desc: "AI analyserar ingredienserna och förklarar vad som är bra och vad du bör undvika." },
      alternatives: { title: "Jämför produkter", desc: "Se hälsobetyg och jämför produkter för att hitta det bästa valet." },
      mealplan: { title: "Planera måltider", desc: "Recept anpassade till din diet, preferenser och budget." },
      shoppinglist: { title: "Smarta inköpslistor", desc: "Kategoriserar produkter och hjälper dig att inte glömma något." },
      ai: { title: "Prata med SunnAI", desc: "Din personliga AI-assistent som svarar på alla frågor om mat och hälsa." },
      share: { title: "Dela recept", desc: "Skicka recept till familj och vänner med ett klick." },
      history: { title: "Spåra historik", desc: "Se vad du har ätit, vad du gillar och vad som kan förbättras." }
    },
    howItWorks: {
      title: "Så fungerar det",
      subtitle: "Tre enkla steg till en hälsosammare vardag",
      step1: { title: "Skanna", desc: "Använd mobilkameran för att skanna streckkoden på matvaror i butiken eller hemma." },
      step2: { title: "Förstå", desc: "Få en enkel förklaring av vad produkten innehåller och hur hälsosam den faktiskt är." },
      step3: { title: "Välj hälsosammare", desc: "Se bättre alternativ direkt och fatta informerade beslut för din hälsa." }
    },
    stories: {
      title: "Våra användarberättelser",
      subtitle: "Se hur SuntValg förändrar vanliga människors liv",
      ingrid: { quote: "Min son visade mig den här appen. Nu delar jag köttbullsrecept med mitt barnbarn Oda med ett klick. Det är fantastiskt att mina recept lever vidare!", role: "Mormor" },
      magnus: { quote: "Jag sparade 400-500 kr i månaden genom att använda inköpslistorna och planera bättre. SunnAI hjälper mig att använda det jag redan har i kylskåpet.", role: "Småbarnspappa" },
      kari: { quote: "Mina barn har allergier, och förut tillbringade jag timmar med att läsa etiketter. Nu skannar jag bara, och appen varnar mig för allergener. Shoppingen tar nu 40 minuter istället för 2 timmar.", role: "Tvåbarnsmamma" },
      einar: { quote: "Efter hjärtinfarkten måste jag vara försiktig med salt och fett. SuntValg fungerar som en dietist i fickan och ger mig trygghet när jag handlar.", role: "Pensionär" }
    },
    pricing: {
      title: "Välj det abonnemang som passar dig",
      subtitle: "Få full tillgång till SuntValg Premium",
      monthly_plan: "Månadsplan",
      monthly_price: "79 NOK",
      monthly_subtext: "per månad",
      monthly_cta: "Köp månadsvis",
      annual_plan: "Årsplan",
      annual_price: "759 NOK",
      annual_subtext: "20% billigare",
      annual_badge: "Bra erbjudande - 20% billigare",
      annual_cta: "Köp årsvis",
      features: {
        unlimited_scans: "Obegränsad skanning och historik",
        ai_assistant: "Full tillgång till SunnAI-assistenten",
        health_alternatives: "Hälsosammare alternativ och dietfilter",
        smart_planning: "Obegränsade recept och inköpslistor"
      }
    },
    faq: {
      title: "Vanliga frågor",
      subtitle: "Undrar du över något? Vi har svaren.",
      q1: "Är SuntValg gratis att använda?",
      a1: "Ja, vi har en gratisversion som låter dig skanna produkter och se hälsobetyget. Premiumversionen ger dig tillgång till obegränsade skanningar, måltidsplanering och SunnAI.",
      q2: "Hur fungerar hälsopoängen?",
      a2: "Vi använder en vetenskapligt baserad algoritm som utvärderar näringsinnehållet (socker, salt, fett, proteiner, fiber) och tillsatser för att ge ett betyg från 0 till 100.",
      q3: "Kan jag använda appen med allergier?",
      a3: "Absolut! Du kan ange dina allergier och preferenser i din profil, så varnar appen dig om en produkt innehåller något du inte tål.",
      q4: "Finns appen på andra språk?",
      a4: "Ja, SuntValg stöder norska, svenska, danska, engelska, polska och ryska."
    },
    waitlist: {
      title: "Bli först att få veta!",
      subtitle: "Gå med i väntelistan och få besked när vi lanserar.",
      email_placeholder: "Din e-postadress",
      button: "Meddela mig vid lansering",
      footer_text: "SuntValg - Hälsosammare val gjort enkelt"
    },
    footer: {
      follow_us: "Följ oss för uppdateringar och hälsotips!"
    }
  }
};

// Lithuanian
const lt = {
  translation: {
    nav: {
      features: "Funkcijos",
      howItWorks: "Kaip tai veikia",
      stories: "Istorijos",
      pricing: "Kainos",
      download: "Prisijungti prie laukiančiųjų sąrašo"
    },
    hero: {
      badge: "✨ Išmaniausias maisto priedas Norvegijoje",
      title_start: "Sveikesni pasirinkimai",
      title_end: "tapo paprasti",
      subtitle: "Skenuokite maisto produktus ir supraskite, ką valgote. Gaukite sveikatos įvertinimą ir sužinokite, ką reiškia ingredientai. Jūsų asmeninis vadovas geresnei mitybai.",
      cta_primary: "Prisijungti prie laukiančiųjų sąrašo",
      cta_secondary: "Sužinoti daugiau",
      users: "Naudoja daugiau nei 10 000 norvegų",
      coming_soon: "Netrukus App Store ir Google Play"
    },
    features: {
      title: "Viskas, ko reikia sveikesniam gyvenimui",
      subtitle: "Nuo planavimo iki apsipirkimo ir gaminimo - SuntValg su jumis visą kelią.",
      scan: { title: "Skenuokite produktus", desc: "Skenuokite brūkšninį kodą ir iš karto gaukite sveikatos įvertinimą nuo 0 iki 100." },
      ingredients: { title: "Supraskite ingredientus", desc: "AI analizuoja ingredientus ir paaiškina, kas yra gerai ir ko vengti." },
      alternatives: { title: "Palyginkite produktus", desc: "Žiūrėkite sveikatos įvertinimus ir palyginkite produktus, kad rastumėte geriausią pasirinkimą." },
      mealplan: { title: "Planuokite valgiaraštį", desc: "Receptai pritaikyti jūsų dietai, pageidavimams ir biudžetui." },
      shoppinglist: { title: "Išmanūs pirkinių sąrašai", desc: "Kategorizuoja produktus ir padeda nieko nepamiršti." },
      ai: { title: "Kalbėkite su SunnAI", desc: "Jūsų asmeninis AI asistentas, atsakantis į visus klausimus apie maistą ir sveikatą." },
      share: { title: "Dalinkitės receptais", desc: "Siųskite receptus šeimai ir draugams vienu paspaudimu." },
      history: { title: "Sekite istoriją", desc: "Žiūrėkite, ką valgėte, kas jums patinka ir ką galite pagerinti." }
    },
    howItWorks: {
      title: "Kaip tai veikia",
      subtitle: "Trys paprasti žingsniai sveikesnei kasdienybei",
      step1: { title: "Skenuokite", desc: "Naudokite telefono kamerą brūkšninio kodo skenavimui parduotuvėje ar namuose." },
      step2: { title: "Supraskite", desc: "Gaukite paprastą paaiškinimą, ką produktas turi ir kiek jis iš tikrųjų sveikas." },
      step3: { title: "Rinkitės sveikiau", desc: "Iš karto pamatykite geresnius variantus ir priimkite informuotus sprendimus savo sveikatai." }
    },
    stories: {
      title: "Mūsų naudotojų istorijos",
      subtitle: "Pažiūrėkite, kaip SuntValg keičia paprastų žmonių gyvenimus",
      ingrid: { quote: "Mano sūnus parodė man šią programėlę. Dabar su vienu paspaudimu dalinuosi kotletų receptais su savo anūke Oda. Nuostabu, kad mano receptai gyvuoja toliau!", role: "Močiutė" },
      magnus: { quote: "Sutaupiau 400-500 kr per mėnesį naudodamas pirkinių sąrašus ir geriau planuodamas. SunnAI padeda man panaudoti tai, kas jau yra šaldytuve.", role: "Jaunas tėtis" },
      kari: { quote: "Mano vaikai turi alergijų, ir anksčiau valandų valandas skaičiau etiketes. Dabar tiesiog skenuoju, ir programėlė mane įspėja apie alergenus. Apsipirkimas dabar trunka 40 minučių vietoj 2 valandų.", role: "Dviejų vaikų mama" },
      einar: { quote: "Po infarkto turiu saugotis druskos ir riebalų. SuntValg veikia kaip dietologas kišenėje ir suteikia man ramybę apsiperkant.", role: "Pensininkas" }
    },
    pricing: {
      title: "Pasirinkite planą, kuris jums tinka",
      subtitle: "Gaukite pilną prieigą prie SuntValg Premium",
      monthly_plan: "Mėnesio planas",
      monthly_price: "79 NOK",
      monthly_subtext: "per mėnesį",
      monthly_cta: "Pirkti mėnesinį",
      annual_plan: "Metinis planas",
      annual_price: "759 NOK",
      annual_subtext: "20% pigiau",
      annual_badge: "Geras pasiūlymas - 20% pigiau",
      annual_cta: "Pirkti metinį",
      features: {
        unlimited_scans: "Neriboti skenavimai ir istorija",
        ai_assistant: "Pilna prieiga prie SunnAI asistento",
        health_alternatives: "Sveikesni variantai ir dietos filtrai",
        smart_planning: "Neriboti receptai ir pirkinių sąrašai"
      }
    },
    faq: {
      title: "Dažniausiai užduodami klausimai",
      subtitle: "Turite klausimų? Mes turime atsakymus.",
      q1: "Ar SuntValg yra nemokamas?",
      a1: "Taip, turime nemokamą versiją, leidžiančią skenuoti produktus ir matyti sveikatos įvertinimą. Premium versija suteikia prieigą prie neribotų skenavimų, valgiaraščio planavimo ir SunnAI.",
      q2: "Kaip veikia sveikatos balas?",
      a2: "Naudojame moksliniu pagrindu sukurtą algoritmą, kuris įvertina maistinę vertę (cukrų, druską, riebalus, baltymus, skaidulas) ir priedus, kad duotų balą nuo 0 iki 100.",
      q3: "Ar galiu naudoti programėlę su alergijomis?",
      a3: "Absoliučiai! Galite įvesti savo alergijas ir pageidavimus profilyje, ir programėlė jus įspės, jei produktas turi ką nors, ko netoleruojate.",
      q4: "Ar programėlė yra kitomis kalbomis?",
      a4: "Taip, SuntValg palaiko norvegų, švedų, danų, anglų, lenkų, rusų ir lietuvių kalbas."
    },
    waitlist: {
      title: "Būkite pirmi sužinoti!",
      subtitle: "Prisijunkite prie laukiančiųjų sąrašo ir gaukite pranešimą apie paleidimą.",
      email_placeholder: "Jūsų el. pašto adresas",
      button: "Pranešti apie paleidimą",
      footer_text: "SuntValg - Sveikesni pasirinkimai tapo paprasti"
    },
    footer: {
      follow_us: "Sekite mus naujienom ir sveikatos patarimams!"
    }
  }
};

// Danish
const da = {
  translation: {
    nav: {
      features: "Funktioner",
      howItWorks: "Sådan virker det",
      stories: "Historier",
      pricing: "Pris",
      download: "Tilmeld venteliste"
    },
    hero: {
      badge: "✨ Norges smarteste mad-app",
      title_start: "Sundere valg",
      title_end: "gjort nemt",
      subtitle: "Scan fødevarer og forstå hvad du spiser. Få en sundhedsvurdering og se hvad ingredienserne betyder. Din personlige guide til en bedre kost.",
      cta_primary: "Tilmeld venteliste",
      cta_secondary: "Læs mere",
      users: "Brugt af over 10.000 nordmænd",
      coming_soon: "Kommer snart til App Store og Google Play"
    },
    features: {
      title: "Alt du behøver for et sundere liv",
      subtitle: "Fra planlægning til indkøb og madlavning - SuntValg er med dig hele vejen.",
      scan: { title: "Scan produkter", desc: "Scan stregkoden og få øjeblikkeligt en sundhedsvurdering fra 0-100." },
      ingredients: { title: "Forstå ingredienser", desc: "AI analyserer ingredienserne og forklarer hvad der er godt, og hvad du bør undgå." },
      alternatives: { title: "Sammenlign produkter", desc: "Se sundhedsvurderinger og sammenlign produkter for at finde det bedste valg." },
      mealplan: { title: "Planlæg måltider", desc: "Opskrifter tilpasset din diæt, præferencer og budget." },
      shoppinglist: { title: "Smarte indkøbslister", desc: "Kategoriserer produkter og hjælper dig med ikke at glemme noget." },
      ai: { title: "Tal med SunnAI", desc: "Din personlige AI-assistent, der svarer på alle spørgsmål om mad og sundhed." },
      share: { title: "Del opskrifter", desc: "Send opskrifter til familie og venner med et klik." },
      history: { title: "Spor historik", desc: "Se hvad du har spist, hvad du kan lide, og hvad der kan forbedres." }
    },
    howItWorks: {
      title: "Sådan virker det",
      subtitle: "Tre nemme trin til en sundere hverdag",
      step1: { title: "Scan", desc: "Brug mobilkameraet til at scanne stregkoden på fødevarer i butikken eller derhjemme." },
      step2: { title: "Forstå", desc: "Få en simpel forklaring på hvad produktet indeholder, og hvor sundt det faktisk er." },
      step3: { title: "Vælg sundere", desc: "Se bedre alternativer med det samme og træf informerede beslutninger for dit helbred." }
    },
    stories: {
      title: "Vores brugerhistorier",
      subtitle: "Se hvordan SuntValg ændrer almindelige menneskers liv",
      ingrid: { quote: "Min søn viste mig denne app. Nu deler jeg frikadelleopskrifter med mit barnebarn Oda med et klik. Det er fantastisk, at mine opskrifter lever videre!", role: "Bedstemor" },
      magnus: { quote: "Jeg sparede 400-500 kr om måneden ved at bruge indkøbslisterne og planlægge bedre. SunnAI hjælper mig med at bruge det, jeg allerede har i køleskabet.", role: "Småbørnsfar" },
      kari: { quote: "Mine børn har allergier, og før brugte jeg timer på at læse etiketter. Nu scanner jeg bare, og appen advarer mig om allergener. Indkøbet tager nu 40 minutter i stedet for 2 timer.", role: "Tobørnsmor" },
      einar: { quote: "Efter hjerteinfarktet skal jeg passe på salt og fedt. SuntValg fungerer som en ernæringsekspert i lommen og giver mig tryghed, når jeg handler.", role: "Pensionist" }
    },
    pricing: {
      title: "Vælg det abonnement der passer dig",
      subtitle: "Få fuld adgang til SuntValg Premium",
      monthly_plan: "Månedsplan",
      monthly_price: "79 NOK",
      monthly_subtext: "pr. måned",
      monthly_cta: "Køb månedligt",
      annual_plan: "Årsplan",
      annual_price: "759 NOK",
      annual_subtext: "20% billigere",
      annual_badge: "Godt tilbud - 20% billigere",
      annual_cta: "Køb årligt",
      features: {
        unlimited_scans: "Ubegrænset scanning og historik",
        ai_assistant: "Fuld adgang til SunnAI-assistenten",
        health_alternatives: "Sundere alternativer og diætfiltre",
        smart_planning: "Ubegrænsede opskrifter og indkøbslister"
      }
    },
    faq: {
      title: "Ofte stillede spørgsmål",
      subtitle: "Undrer du dig over noget? Vi har svarene.",
      q1: "Er SuntValg gratis at bruge?",
      a1: "Ja, vi har en gratis version, der lader dig scanne produkter og se sundhedsvurderingen. Premiumversionen giver dig adgang til ubegrænsede scanninger, måltidsplanlægning og SunnAI.",
      q2: "Hvordan fungerer sundhedsscoren?",
      a2: "Vi bruger en videnskabeligt baseret algoritme, der vurderer nærringsindholdet (sukker, salt, fedt, proteiner, fibre) og tilsætningsstoffer for at give en score fra 0 til 100.",
      q3: "Kan jeg bruge appen med allergier?",
      a3: "Absolut! Du kan indtaste dine allergier og præferencer i din profil, og appen vil advare dig, hvis et produkt indeholder noget, du ikke tåler.",
      q4: "Er appen tilgængelig på andre sprog?",
      a4: "Ja, SuntValg understøtter norsk, svensk, dansk, engelsk, polsk og russisk."
    },
    waitlist: {
      title: "Bliv den første til at vide det!",
      subtitle: "Tilmeld ventelisten og få besked, når vi lancerer.",
      email_placeholder: "Din e-mailadresse",
      button: "Giv mig besked ved lancering",
      footer_text: "SuntValg - Sundere valg gjort nemt"
    },
    footer: {
      follow_us: "Følg os for opdateringer og sunde tips!"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      no,
      sv,
      da,
      pl,
      en,
      ru,
      lt
    },
    lng: "no", // Default language
    fallbackLng: "no",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
