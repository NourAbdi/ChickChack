import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import english from './english.json';
import arabic from './arabic.json';
import hebrew from './hebrew.json';

const languageTag = Localization.locale.split('-')[0];
const fallbackLanguage = 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: languageTag,
    fallbackLng: fallbackLanguage,
    compatibilityJSON: 'v3',
    debug: true,
    resources: {
      en: english,
      ar: arabic,
      he: hebrew,
      // Add more language resources as needed
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
