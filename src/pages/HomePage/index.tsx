import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    CurrencyWrapper,
    InputWrapper,
    SelectWrapper,
    Tab,
    TabContainer,
} from '../SupplyPage'
import {
    Button,
    Buttons,
    Card,
    Column,
    Counter,
    Grid,
    Head,
    HelperRow,
    Left,
    Popup,
    PopupBottom,
    PopupButton,
    PopupContent,
    PopupTitle,
    Right,
    Row,
    StyledHome,
    Text,
} from './components/main'
import { Pagination, Title } from './components/bottom'
import { useOnClickOutside } from '../../lib/useOnClickOutside'
import { allowedAssets } from '../../lib/data'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { gameSlice } from '../../store/reducers/gameSlice'
import { Timeframes } from './components/timeframes'
import SelectCurrency from './components/selectCurrency'
import { BetCard } from './components/BetCard'
import { Chart } from './components/Chart'
// import {
//     getPythProgramKeyForCluster,
//     PriceStatus,
//     PythConnection,
// } from '@pythnetwork/client'

let data = [
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '+266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '-266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '+266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '-266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '+266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '-266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '+266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '-266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '+266.454',
    },
    {
        open: '$19,2587.45',
        close: '00:47',
        result: '-266.454',
    },
]

const Home = () => {
    //let array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const { selectedAsset, selectedAssetImg, currentRewardPercent } =
        useAppSelector((state) => state.gameSlice)
    const { changeAsset } = gameSlice.actions
    const dispatch = useAppDispatch()
    const [show, setShow] = React.useState<boolean>(false)
    const [popup, setPopup] = React.useState<boolean>(false)
    let ref = React.useRef(null)
    let ref2 = React.useRef(null)
    useOnClickOutside(ref, () => setShow(false))
    useOnClickOutside(ref2, () => setPopup(false))

    useEffect(() => {
        //request data from contract
    }, [selectedAsset])



    return (
        <StyledHome>
            <div className="container">
                <SelectCurrency />
                <Row>
                    <Chart />
                    <BetCard />
                </Row>
                <Title>Trade</Title>
                <div className="tab_container">
                    <TabContainer>
                        <Tab active>
                            <span>Active</span>
                        </Tab>
                        <Tab>
                            <span>Closed</span>
                        </Tab>
                        <Tab>
                            <span>
                                Uncollected <h3>3</h3>
                            </span>
                        </Tab>
                    </TabContainer>
                </div>

                <DataTable>
                    <DataHeader>
                        <span className="center mobile-display-none">
                            Asset
                        </span>
                        <span className="mobile-no-color">Direction</span>
                        <span className="">Open</span>
                        <span>Close</span>
                        <span className="mobile-display-none">Chart</span>
                        <span className="last">Result</span>
                    </DataHeader>
                    <DataContent>
                        {data.slice(0, 10).map((_, idx) => (
                            <DataContentItem key={uuidv4()}>
                                <span className="center mobile-display-none">
                                    <img
                                        src="/images/home/bitcoin.svg"
                                        alt=""
                                    />
                                </span>
                                <span className="">
                                    <svg
                                        className="first_td_adaptive"
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
                                </span>
                                <span className="center">$19,2587.45</span>

                                <span className="center">{_.close}</span>
                                <span className="chart_td center mobile-display-none">
                                    <img src="/images/home/Chart.png" alt="" />
                                </span>
                                <span
                                    className={
                                        idx % 2 === 0
                                            ? 'price-increase last'
                                            : 'price-drop last'
                                    }
                                >
                                    {_.result}
                                </span>
                            </DataContentItem>
                        ))}
                    </DataContent>
                </DataTable>

                <Pagination>
                    <img src="/images/home/pagination.svg" alt="" />
                    <img
                        src="/images/home/pagination.svg"
                        alt=""
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </Pagination>

                <Popup show={show}>
                    <PopupContent ref={ref}>
                        <Head>
                            <PopupTitle>Trade result</PopupTitle>
                            <img
                                src="/images/home/close.svg"
                                alt=""
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

const DataTable = styled.div`
    span {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .center {
        text-align: center;
    }
`

const DataHeader = styled.div`
    display: grid;
    grid-template-columns: 32px 51px 84px repeat(3, 1fr);
    gap: 32px;

    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        text-align: center;
        color: #8a8f99;

        &.last {
            justify-content: flex-end;
        }
    }

    @media screen and (max-width: 768px) {
        gap: 24px;

        grid-template-columns: 32px 32px 84px repeat(3, 1fr);

        .mobile-no-color {
            color: transparent;
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0 16px 0 8px;
        grid-template-columns: repeat(4, 1fr);

        .mobile-display-none {
            display: none;
        }
    }
`

const DataContent = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 33px;

    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        text-align: center;
        color: ${({ theme }) => theme.faqColor};

        &.last {
            justify-content: flex-end;
        }

        &.price-increase {
            color: var(--green);
        }

        &.price-drop {
            color: var(--pink);
        }
    }
`

const DataContentItem = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: 32px 51px 84px repeat(3, 1fr);

    @media screen and (max-width: 768px) {
        gap: 24px;
        grid-template-columns: 32px 32px 84px repeat(3, 1fr);
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
        padding: 0 16px 0 8px;

        .mobile-display-none {
            display: none;
        }
    }
`

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
