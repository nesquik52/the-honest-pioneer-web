import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "THE HONEST PIONEER",
      buySteam: "Wishlist on Steam",
      findUs: "FIND US ON SOCIALS",
      historyTitle: "HISTORY OF CREATION",
      gaidarName: "Arkady Gaidar",
      gaidarInfo: "The main idea is based on the modernization of Arkady Gaidar's classic story 'Timur and His Team'. We came to this after seeing the 1940 film of the same name.",
      skdTitle: "STARTUP AS A DIPLOMA",
      skdDesc: "The project is being developed within the 'Startup as a Diploma' framework and will be presented at the VKR defense.",
      teamTitle: "TEAM OF FOUR",
      teamDesc: "There are four of us. Each of us is responsible for their part of the project and will defend it at the final assessment.",
      teamWork: "Assistance",
      teamWorkDesc: "The project was assisted by a certified designer and a musician to create a more beautiful atmosphere. Without them, we are just 4 programmers.",
      visualStyle: "VISUAL STYLE",
      visualStyleDesc: "We tried to develop beautiful models and there were many edits to them, but we managed to integrate them into the project and use them for the game.",
      lang_ru: "РУС",
      lang_en: "ENG",
      navAbout: "About",
      navHistory: "History",
      navSocials: "Socials",
      descTitle: "WHAT IS 'THE HONEST PIONEER'?",
      descText: "This is a cooperative indie game for 1–4 players powered by Unreal Engine 5. You help the residents of a 1940s Soviet village by completing household quests through physical interaction. Every action you take affects the 'Trust Meter', leading to one of the possible endings.",
      breakPrompt: "Break it",
      footerCopyright: "© 2026 Honest Pioneer. All rights reserved.",
      screenshotAlt: "Screenshot",
      placeholderText: "Screenshot coming soon"
    }
  },
  ru: {
    translation: {
      title: "ЧЕСТНОЕ ПИОНЕРСКОЕ",
      buySteam: "В желаемое в Steam",
      findUs: "ИЩИТЕ НАС В СОЦСЕТЯХ",
      historyTitle: "ИСТОРИЯ СОЗДАНИЯ",
      gaidarName: "Аркадий Гайдар",
      gaidarInfo: "Основная идея базируется на модернизации классического сюжета Аркадия Гайдара «Тимур и его команда». Пришли к этому не сразу, а после того, как увидели одноименный фильм 1940 года.",
      skdTitle: "СТАРТАП КАК ДИПЛОМ",
      skdDesc: "Проект разрабатывается в рамках программы «Стартап как диплом» и будет представлен на защите ВКР.",
      teamTitle: "КОМАНДА ИЗ 4 ЧЕЛОВЕК",
      teamDesc: "Нас четверо. Каждый из нас отвечает за свою часть проекта и будет защищать её на итоговой аттестации.",
      teamWork: "Помощь",
      teamWorkDesc: "Помощь проекту оказывали дипломированные дизайнер и музыкант, чтобы создать более красивую атмосферу. Без них мы просто 4 программиста.",
      visualStyle: "ВИЗУАЛЬНЫЙ СТИЛЬ",
      visualStyleDesc: "Мы пытались разработать красивые модели и было много правок по ним, но нам удалось внедрить их в проект и использовать для игры.",
      lang_ru: "РУС",
      lang_en: "ENG",
      navAbout: "Об игре",
      navHistory: "История",
      navSocials: "Соцсети",
      descTitle: "ЧТО ТАКОЕ «ЧЕСТНОЕ ПИОНЕРСКОЕ»?",
      descText: "Это кооперативная инди-игра для 1–4 игроков на базе Unreal Engine 5. Вы помогаете жителям советской деревни 1940-х годов, выполняя бытовые квесты через физическое взаимодействие. Каждое ваше действие влияет на «Шкалу доверия», что ведет к одной из возможных концовок.",
      breakPrompt: "Разбей",
      footerCopyright: "© 2026 Честное пионерское. Все права защищены.",
      screenshotAlt: "Скриншот",
      placeholderText: "Скриншот скоро появится"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;