import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    debug: true,
    interpolation: {
      escapeValue: false, // React đã xử lý an toàn
    },
  });

export default i18n;
