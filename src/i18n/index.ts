import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const i18nConfig = {
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export default i18n;
