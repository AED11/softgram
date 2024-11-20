import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend) // Для загрузки файлов перевода
  .use(LanguageDetector) // Для детектирования языка пользователя
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: 'en', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React уже безопасно обрабатывает значения
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь для загрузки файлов переводов
    },
    react: {
      useSuspense: false, // Отключение React Suspense (по необходимости)
    },
  });

export default i18next;
