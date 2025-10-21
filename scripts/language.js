// scripts/language.js
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("languageSelect");
  const mobileNavSelect = document.querySelector(".d-lg-none select");

  // translate
  const translations = {
    en: {
      brand: "BIG CITY LIVE",
      home: "Home",
      events: "Events",
      about: "About Us",
      places: "Places",
      signIn: "Sign In",
      signUp: "Sign Up",
      bannerTitle: "VISIT ASTANA",
      bannerText: "Discover the vibrant capital of Kazakhstan, where modern architecture meets rich cultural heritage",
      readMore: "Read More",
      readLess: "Read Less",
      faqTitle: "FAQ",
      faqQ1: "What is this website about?",
      faqA1: "This is a demo FAQ answer.",
      faqQ2: "How do I register?",
      faqA2: "Click on the Sign Up button in the header and fill in the form.",
      faqQ3: "How can I contact support?",
      faqA3: "You can reach us through the Contact page.",
      contactTitle: "Contact Us",
      contactCreators: "Creators: Iskander Kustayev, Olzhas Omerzak, Bekbolat Yergalyuly",
      followTitle: "Follow Us"
    },
    ru: {
      brand: "BIG CITY LIVE",
      home: "Главная",
      events: "События",
      about: "О нас",
      places: "Места",
      signIn: "Войти",
      signUp: "Регистрация",
      bannerTitle: "ПОСЕТИ АСТАНУ",
      bannerText: "Открой для себя яркую столицу Казахстана, где современная архитектура сочетается с богатым культурным наследием",
      readMore: "Подробнее",
      readLess: "Скрыть",
      faqTitle: "Часто задаваемые вопросы",
      faqQ1: "О чём этот сайт?",
      faqA1: "Это демонстрационный ответ.",
      faqQ2: "Как зарегистрироваться?",
      faqA2: "Нажмите кнопку 'Регистрация' вверху и заполните форму.",
      faqQ3: "Как связаться с поддержкой?",
      faqA3: "Вы можете написать нам через страницу 'Контакты'.",
      contactTitle: "Контакты",
      contactCreators: "Создатели: Искандер Кустаев, Олжас Омерзак, Бекболат Ергалулы",
      followTitle: "Мы в соцсетях"
    }
  };

  // Switch function
  function updateLanguage(lang) {
    let t;
    switch (lang) {
      case "ru":
        t = translations.ru;
        break;
      case "en":
      default:
        t = translations.en;
        break;
    }

    // Header 
    const brandSpan = document.querySelector(".navbar-brand .fw-bold");
    if (brandSpan) brandSpan.textContent = t.brand;

    const navHome = document.querySelector('.navbar-nav a.nav-link[href="index.html"]');
    const navEvents = document.querySelector('.navbar-nav a.nav-link[href="pages/events.html"]');
    const navAbout = document.querySelector('.navbar-nav a.nav-link[href="pages/about.html"]');
    const navPlaces = document.querySelector('.navbar-nav a.nav-link[href="pages/cities.html"]');

    if (navHome) navHome.textContent = t.home;
    if (navEvents) navEvents.textContent = t.events;
    if (navAbout) navAbout.textContent = t.about;
    if (navPlaces) navPlaces.textContent = t.places;

    // Sign In / Sign Up (select by classes)
    const signInBtn = document.querySelector('a[href="../pages/login.html"]');
    const signUpBtn = document.querySelector('.btn-warning');
    if (signInBtn) signInBtn.textContent = t.signIn;
    if (signUpBtn) signUpBtn.textContent = t.signUp;

    // Mobile nav 
    if (mobileNavSelect) {
      // keep values, only update labels
      const opts = mobileNavSelect.options;
      for (let i = 0; i < opts.length; i++) {
        const val = opts[i].value;
        if (val === "index.html") opts[i].text = t.home;
        if (val === "pages/events.html") opts[i].text = t.events;
        if (val === "pages/about.html") opts[i].text = t.about;
        // pages/login.html and Sign Up can stay as they are or you can update sign in
        if (val === "pages/login.html" || val === "../pages/login.html") opts[i].text = t.signIn;
      }
    }

    // Banner
    const bannerTitle = document.querySelector(".visit-banner h1");
    const bannerText = document.querySelector(".visit-banner p");
    if (bannerTitle) bannerTitle.textContent = t.bannerTitle;
    if (bannerText) bannerText.textContent = t.bannerText;

    // Cards: Read more button text
    document.querySelectorAll(".read-more").forEach(btn => {
      btn.textContent = t.readMore;

      btn.dataset.readMore = t.readMore;
      btn.dataset.readLess = t.readLess;
    });

    // FAQ
    const faqTitle = document.querySelector(".faq h2");
    if (faqTitle) faqTitle.textContent = t.faqTitle;

    const faqQuestions = document.querySelectorAll(".faq-question");
    const faqAnswers = document.querySelectorAll(".faq-answer p");

    // safely update up to first three Q/A 
    if (faqQuestions[0]) faqQuestions[0].innerHTML = `${t.faqQ1} <span class="arrow">▼</span>`;
    if (faqAnswers[0]) faqAnswers[0].textContent = t.faqA1;

    if (faqQuestions[1]) faqQuestions[1].innerHTML = `${t.faqQ2} <span class="arrow">▼</span>`;
    if (faqAnswers[1]) faqAnswers[1].textContent = t.faqA2;

    if (faqQuestions[2]) faqQuestions[2].innerHTML = `${t.faqQ3} <span class="arrow">▼</span>`;
    if (faqAnswers[2]) faqAnswers[2].textContent = t.faqA3;

    // Footer
    const footerContactTitle = document.querySelector(".footer-info h3");
    const footerCreators = document.querySelector(".footer-info p");
    const footerFollow = document.querySelector(".footer-social h3");

    if (footerContactTitle) footerContactTitle.textContent = t.contactTitle;
    if (footerCreators) footerCreators.textContent = t.contactCreators;
    if (footerFollow) footerFollow.textContent = t.followTitle;
  }

  // default lang is eng
  const savedLang = localStorage.getItem("language") || "en";
  if (langSelect) langSelect.value = savedLang;
  updateLanguage(savedLang);

  // Switch lang. and save it in LocalStorage
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      const selected = langSelect.value || "en";
      localStorage.setItem("language", selected);
      updateLanguage(selected);
    });
  }
});
