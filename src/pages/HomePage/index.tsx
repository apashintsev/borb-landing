import { useEffect } from 'react'
import styled from 'styled-components'
import { Row, StyledHome } from './components/main'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { gameSlice } from '../../store/reducers/gameSlice'
import SelectCurrency from '../../components/SelectCurrency/SelectCurrency'
import { BetCard } from './components/BetCard'
import { Chart } from './components/Chart'
import { History } from './components/History'
import { getQueryVariable } from '../../lib/sharedFunctions'
import { regexEthAddress } from '../../lib/data'
import { PopupWindow } from './components/Popup'

const Home = () => {
    const { asset } = useAppSelector((state) => state.gameSlice)
    const { setRef } = gameSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        const refFromUrl = getQueryVariable('ref').toString()
        let result = refFromUrl.match(regexEthAddress)
        if (!!result && result?.length > 0) {
            dispatch(setRef(result[0]))
        }
    }, [asset])

    return (
        <StyledHome>
            <div className="container">
                <SelectCurrency />
                <Row>
                    <Chart />
                    <BetCard />
                </Row>
                <History />
            </div>
            <PopupWindow />
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
