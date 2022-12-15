import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useOnClickOutside } from '../lib/useOnClickOutside'
import { appSettings } from '../store/reducers/appSettingsSlice'

const data = [
    {
        name: 'English',
        short: 'EN',
        url: 'https://1inch.io/img/flags/en.png',
    },
    {
        name: '简体中文',
        short: 'ZH',
        url: 'https://1inch.io/img/flags/zh.png',
    },
    {
        name: 'Русский',
        short: 'RU',
        url: 'https://1inch.io/img/flags/ru.png',
    },
    {
        name: 'Français',
        short: 'FR',
        url: 'https://1inch.io/img/flags/fr.png',
    },
    {
        name: '日本語',
        short: 'JA',
        url: 'https://1inch.io/img/flags/ja.png',
    },
    {
        name: 'Español',
        short: 'ES',
        url: 'https://1inch.io/img/flags/es.png',
    },
    {
        name: '한국어',
        short: 'KO',
        url: 'https://1inch.io/img/flags/ko.png',
    },
    {
        name: 'Bahasa Indonesia',
        short: 'IND',
        url: 'https://1inch.io/img/flags/ind.png',
    },
    {
        name: 'Tiếng Việt',
        short: 'VN',
        url: 'https://1inch.io/img/flags/vn.png',
    },
    {
        name: 'Українська',
        short: 'UA',
        url: 'https://1inch.io/img/flags/ua.png',
    },
    {
        name: 'Português',
        short: 'PT',
        url: 'https://1inch.io/img/flags/pt.png',
    },
]

const LangaugePopup = () => {
    const { isLangaugePopup } = useAppSelector((state) => state.appSettings)
    const { setIsLangaugePopup } = appSettings.actions
    const dispatch = useAppDispatch()
    let ref = useRef(null)
    useOnClickOutside(ref, () => dispatch(setIsLangaugePopup(false)))

    const { t, i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <>
            {isLangaugePopup && (
                <StyledPopup ref={ref}>
                    <div className="head">
                        <h4 className="title">Change language</h4>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            onClick={() => dispatch(setIsLangaugePopup(false))}
                        >
                            <g>
                                <g>
                                    <polygon
                                        points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
                                    />
                                </g>
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                        </svg>
                    </div>

                    <div className="grid">
                        {data.map((card) => (
                            <div key={card.short} className="card" onClick={() => dispatch(setIsLangaugePopup(false))}>
                                <img className="card_img" src={card.url} alt={card.name} />
                                <p onClick={() => changeLanguage(card.short.toLowerCase())}>
                                    {card.name} &nbsp;-&nbsp; {card.short}
                                </p>
                            </div>
                        ))}
                    </div>
                </StyledPopup>
            )}
        </>
    )
}

export default LangaugePopup

const StyledPopup = styled.div`
    width: 550px;
    padding: 24px;
    box-shadow: 0 5px 20px rgb(0 0 0 / 25%);
    border-radius: 16px;
    position: absolute;
    z-index: 11111;
    background: ${(props) => props.theme.backgroundContent};
    right: 50px;
    top: 80px;
    .title {
        font-size: 20px;
        color: ${(props) => props.theme.arrowBackgroundColor};
    }
    .head {
        padding-bottom: 18px;
        margin-bottom: 24px;
        border-bottom: 1px solid ${(props) => props.theme.arrowBackgroundColor};
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .head svg {
        width: 16px;
        height: 16px;
    }
    polygon {
        fill: ${(props) => props.theme.arrowBackgroundColor};
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 4px;
    }
    svg {
        cursor: pointer;
    }
    .card_img {
        width: 24px;
        height: 24px;
        margin-right: 16px;
    }
    .card {
        padding: 0 16px;
        height: 48px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.2s all ease;
        border: 1px solid transparent;
        &:hover,
        &:active {
            padding: 0 15px;
            color: #fff;
            background: ${(props) => props.theme.borderColor};
            border-color: lightgray;
            border-radius: 8px;
        }
    }
    p {
        color: ${(props) => props.theme.arrowBackgroundColor};
        font-size: 16px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 100vh;
        right: 0;
        top: 0;
        box-sizing: border-box;
        position: fixed;
        overflow-y: scroll;
        .grid {
            grid-template-columns: 1fr;
            grid-gap: 24px;
        }
    }
`
