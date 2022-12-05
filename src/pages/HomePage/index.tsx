import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Column,
    Head,
    Popup,
    PopupBottom,
    PopupButton,
    PopupContent,
    PopupTitle,
    Row,
    StyledHome,
} from './components/main'
import { useOnClickOutside } from '../../lib/useOnClickOutside'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { gameSlice } from '../../store/reducers/gameSlice'
import SelectCurrency from './components/SelectCurrency'
import { BetCard } from './components/BetCard'
import { Chart } from './components/Chart'
import { History } from './components/History'
import { getQueryVariable } from '../../lib/sharedFunctions'
import { regexEthAddress } from '../../lib/data'

const Home = () => {
    const { asset } = useAppSelector((state) => state.gameSlice)
    const { setRef } = gameSlice.actions
    const dispatch = useAppDispatch()
    const [show, setShow] = React.useState<boolean>(false)
    const [popup, setPopup] = React.useState<boolean>(false)
    let ref = React.useRef(null)
    let ref2 = React.useRef(null)
    useOnClickOutside(ref, () => setShow(false))
    useOnClickOutside(ref2, () => setPopup(false))

    useEffect(() => {
        const refFromUrl = getQueryVariable('ref').toString()
        let result = refFromUrl.match(regexEthAddress)
        if (!!result && result?.length > 0) {
            dispatch(setRef(result[0]))
        }
    }, [asset])
    const handleClick = async () => {
        //setIsLoading(true)
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URI! +
                    '/api/Settings/ToggleAggregatorIsOn',
                {
                    method: 'POST',
                }
            )

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`)
            }

            const result = await response.json()

            // console.log('result is: ', JSON.stringify(result, null, 4))

            //setData(result)
        } catch (err) {
            //setErr(err.message)
        } finally {
            // setIsLoading(false)
        }
    }
    const handleClick2 = async () => {
        //setIsLoading(true)
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URI! +
                    '/api/Settings/GetAggregatorIsOn',
                {
                    method: 'Get',
                }
            )

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`)
            }

            const result = await response.json()
            alert(result)
            // console.log('result is: ', JSON.stringify(result, null, 4))

            //setData(result)
        } catch (err) {
            //setErr(err.message)
        } finally {
            // setIsLoading(false)
        }
    }
    return (
        <StyledHome>
            <div className="container">
                <button
                    style={{ backgroundColor: 'red', marginBottom:'40px' }}
                    onClick={handleClick}
                >
                    Включить/выключить
                </button>
                
                <button
                    style={{ backgroundColor: 'red' }}
                    onClick={handleClick2}
                >
                    Включено?
                </button>
                <SelectCurrency />
                <Row>
                    <Chart />
                    <BetCard />
                </Row>
                <History />

                <Popup show={show}>
                    <PopupContent ref={ref}>
                        <Head>
                            <PopupTitle>Trade result</PopupTitle>
                            <img
                                src="/images/home/close.svg"
                                alt="Close"
                                onClick={() => setShow(false)}
                            />
                        </Head>
                        <PopupBottom>
                            <Column>
                                <p>Asset</p>
                                <img src="/images/home/bitcoin.svg" alt="" />
                            </Column>
                            <Column>
                                <p>Direction</p>
                                <svg
                                    style={{
                                        position: 'relative',
                                        bottom: '-6px',
                                    }}
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 12L22 20H10L16 12Z"
                                        fill="var(--green)"
                                    />
                                </svg>
                            </Column>
                            <Column>
                                <p>Timeframe</p>
                                <span>15 min</span>
                            </Column>
                            <PopupButton>Claim $100</PopupButton>
                        </PopupBottom>
                    </PopupContent>
                </Popup>
            </div>
        </StyledHome>
    )
}

export const SelectBody = styled.div`
    position: absolute;
    z-index: 111;
    left: 8px;
    top: 45px;
    width: 150px;
    padding: 16px 0;
    background: ${(props) => props.theme.navbarBg};
    border-radius: 8px;
    box-shadow: 0 5px 20px rgb(0 0 0 / 25%);
    .select_card {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;

        img {
            width: 20px;
            height: 20px;
        }

        p {
            color: ${(props) => props.theme.arrowBackgroundColor};
            margin-left: 16px;
            text-transform: uppercase;
            font-size: 16px;
        }
        &:hover {
            background: ${(props) => props.theme.selectColor};
            p {
                color: ${(props) => props.theme.navbarBg};
            }
        }
    }
`

export const SelectBodyHead = styled.div`
    position: absolute;
    z-index: 111;
    left: 0;
    top: 45px;
    width: auto;
    padding: 16px 0;
    background: ${(props) => props.theme.navbarBg};
    border-radius: 8px;
    box-shadow: 0 5px 20px rgb(0 0 0 / 25%);
    .select_card {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;

        img {
            width: 20px;
            height: 20px;
        }

        p {
            color: ${(props) => props.theme.arrowBackgroundColor};
            margin-left: 16px;
            font-size: 16px;
            &:first-letter {
                text-transform: uppercase;
            }
        }
        &:hover {
            background: ${(props) => props.theme.selectColor};
            p {
                color: ${(props) => props.theme.navbarBg};
            }
        }
    }
`
export default Home
