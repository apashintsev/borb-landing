import { useEffect, useRef } from 'react'
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
import { Web3ContextProvider } from './context/Web3Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './i18n/config'

const App = () => {
    const { themeName, themeSettings, isBurger } = useAppSelector((state) => state.appSettings)

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
        <Web3ContextProvider>
            <ThemeProvider theme={themeSettings}>
                <div className="App" id="app" ref={appRef}>
                    <Nav />
                    <MainContainer>
                        <Header />
                        <LangaugePopup />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/supply" element={<SupplyPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/earn" element={<EarnPage />} />
                            <Route path="/about" element={<AboutPage />} />
                        </Routes>
                    </MainContainer>
                    <Footer />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={10000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </ThemeProvider>
        </Web3ContextProvider>
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
