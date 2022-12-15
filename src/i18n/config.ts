import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './translations/en.json'
import ru from './translations/ru.json'

const resources = {
    en,
    ru,
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        debug: false, //true,
        defaultNS: 'texts',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })
