import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as en from './locales/en.json'
import * as kr from './locales/kr.json'

export const resources = {
  en: {
    translation: en
  },
  kr: {
    translation: kr
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    returnNull: false,
    resources,
    fallbackLng: 'kr',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
