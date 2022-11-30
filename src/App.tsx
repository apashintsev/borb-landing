import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'
import AboutPage from './pages/AboutPage'
import EarnPage from './pages/EarnPage'
import HomePage from './pages/HomePage'
import { SupplyPage } from './pages/SupplyPage'

//@ts-ignore
import LangaugePopup from './components/LanguagePopup'
import { useAppSelector } from './hooks/redux'

const App = () => {
    const { themeName, themeSettings, isBurger, isLangaugePopup } =
        useAppSelector((state) => state.appSettings)
    //const [isBurger, setIsBurger] = useState(false)
    //const [isLangaugePopup, setIsLangaugePopup] = useState(false)
    let ref = useRef()

    const appRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isBurger) {
            document.body.style.overflow = 'hidden'
            return appRef?.current?.classList.add('App_active')
        } else {
            document.body.style.overflow = 'scroll'
        }

        appRef?.current?.classList.remove('App_active')
    }, [isBurger])

    useEffect(() => {
        localStorage.setItem('appTheme', themeName)
    }, [themeName])

    return (
        <ThemeProvider theme={themeSettings}>
            <div className="App" id="app" ref={appRef}>
                <Nav
                /*isBurger={isBurger}
                    setIsBurger={setIsBurger}
                    set={setIsLangaugePopup}*/
                />
                <MainContainer>
                    <Header />
                    {isLangaugePopup && <LangaugePopup />}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/supply" element={<SupplyPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/earn" element={<EarnPage />} />
                    </Routes>
                </MainContainer>
                <Footer />
            </div>
        </ThemeProvider>
    )
}

const MainContainer = styled.div`
    overflow: hidden;
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${(props) => props.theme.backgroundContent};

    transition: background-color 0.3s ease;
    @media screen and (max-width: 1280px) {
        padding: 0;
    }
`

export default App
