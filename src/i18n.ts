import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          welcome1: "Please Log in",
          about: "About us",
          link1: "Home",
          link2: "Products",
          link3: "Contact",
          link4: "About",
          link5: "Sign up",
          link6: "404",
          buttonlog: "Log in",
          buttonreg: "Register",
          search: "Search",

          ourStory: "Our Story",
          storyText1:
            "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.",
          storyText2:
            "Exclusive has more than 1 Million products to offer, growing very fast. Exclusive offers a diverse assortment in categories ranging from consumer.",

          sellersActive: "Sellers active on our site",
          monthlySale: "Monthly Product Sale",
          customersActive: "Customers active on our site",
          annualGross: "Annual gross sale on our site",

          founder: "Founder & Chairman",

          freeDeliveryTitle: "FREE AND FAST DELIVERY",
          freeDeliveryText: "Free delivery for all orders over $140",

          pageNotFound: "Page Not Found",
        },
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          welcome1: "Пожалуйста, войдите",
          about: "О нас",
          link1: "Главная",
          link2: "Продукты",
          link3: "Контакты",
          link4: "О компании",
          link5: "Регистрация",
          link6: "404",
          buttonlog: "Войти",
          buttonreg: "Регистрация",
          search: "Поиск",

          ourStory: "Наша история",
          storyText1:
            "Основанная в 2015 году, Exclusive — ведущая онлайн‑платформа Южной Азии с активным присутствием в Бангладеш. Благодаря широкому спектру маркетинговых, аналитических и сервисных решений, Exclusive объединяет 10 500 продавцов и 300 брендов и обслуживает 3 миллиона клиентов по всему региону.",
          storyText2:
            "Exclusive предлагает более 1 миллиона товаров и быстро растёт. Ассортимент охватывает самые разные категории — от потребительских товаров и далее.",

          sellersActive: "Продавцы активны на нашем сайте",
          monthlySale: "Ежемесячные продажи товаров",
          customersActive: "Клиенты активны на нашем сайте",
          annualGross: "Годовой объём продаж на нашем сайте",

          founder: "Основатель и председатель",

          freeDeliveryTitle: "БЕСПЛАТНАЯ И БЫСТРАЯ ДОСТАВКА",
          freeDeliveryText: "Бесплатная доставка для всех заказов свыше $140",

          pageNotFound: "Страница не найдена",
        },
      },
    },
  });

export default i18n;