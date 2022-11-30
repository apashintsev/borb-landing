import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeName, ThemeSettings } from '../../types/App/theme'
export const lightTheme: ThemeSettings = {
    backgroundContent: '#ffffff',
    titleColor: '#23272B',
    borderColor: '#e9ecf2',
    subtitleColor: ' #8A8F99',
    tabBorderColor: '#E9ECF2',
    selectColor: '#23272B',
    inputPlaceholderColor: '#C2C5CC',
    navbarBg: '#fff',
    inputWrapperColor: '#ffffff',
    inputWrapperDisabledColor: '#F6F8FC',
    inputBorderColor: '#E9ECF2',
    inputDisabledBorderColor: '#F6F8FC',
    arrowBackgroundColor: '#23272B',
    faqColor: '#23272B',
    faqBorderColor: '#E9ECF2',
    faqCrossColor: '#23272B',
    homePageButton: '#E9ECF2',
    navbarBottom: '#C2C5CC',
    walletBorder: '#E9ECF2',
    navbarHoverFill: '#23272B',
    navbarHover: '#F6F8FC',
    black: '#23272B',
}

export const darkTheme: ThemeSettings = {
    black: '#fff',
    backgroundContent: '#23272B',
    borderColor: '#3D424D',
    titleColor: '#F6F8FC',
    subtitleColor: '#8A8F99',
    tabBorderColor: '#3D424D',
    selectColor: '#F6F8FC',
    inputPlaceholderColor: '#8A8F99',
    navbarBg: '#16191C',
    inputWrapperColor: '#16191C',
    inputBorderColor: '#3D424D',
    inputDisabledBorderColor: '#30373C',
    inputWrapperDisabledColor: '#30373C',
    arrowBackgroundColor: '#F6F8FC',
    faqColor: '#F6F8FC',
    faqBorderColor: '#3D424D',
    faqCrossColor: '#8A8F99',
    homePageButton: '#3D424D',
    navbarBottom: '#3D424D',
    walletBorder: '#3D424D',
    navbarHover: '#30373C',
    navbarHoverFill: '#F6F8FC',
}
export const initialState = {
    isBurger: false,
    isLangaugePopup: false,
    themeName: (localStorage.getItem('appTheme') ?? 'dark') as ThemeName,
    themeSettings: (localStorage.getItem('appTheme') === 'light'
        ? lightTheme
        : darkTheme) as ThemeSettings,
}
//export type AppType = typeof initialState

export const appSettings = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        changeTheme(state) {
            if (state.themeName === 'light') {
                state.themeName = 'dark'
                state.themeSettings = darkTheme
            } else {
                state.themeName = 'light'
                state.themeSettings = lightTheme
            }
        },
        setIsBurger(state, action: PayloadAction<boolean>) {
            state.isBurger = action.payload
        },
        setIsLangaugePopup(state, action: PayloadAction<boolean>) {
            state.isLangaugePopup = action.payload
        },
        /*setNetwork(
            state,
            action: PayloadAction<{ network: Web3ProviderState['network'] }>
        ) {
            state.network = action.payload.network
        },
        resetWeb3Provider(state) {},*/
    },
})

export default appSettings.reducer
