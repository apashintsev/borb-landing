import 'react-i18next'
import en from '../i18n/translations/en.json'

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'texts'
        resources: typeof en
    }
}
