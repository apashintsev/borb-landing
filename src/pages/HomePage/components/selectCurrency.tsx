import * as React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { allowedCurrencies } from '../../../lib/data'
import { useOnClickOutside } from '../../../lib/useOnClickOutside'
import { gameSlice } from '../../../store/reducers/gameSlice'

export default function SelectCurrency() {
    const { selectedCurrencyTicker, selectedCurrencyImg } = useAppSelector(
        (state) => state.gameSlice
    )
    const { setCurrency } = gameSlice.actions
    const dispatch = useAppDispatch()

    const [secondPopup, setSecondPopup] = React.useState<boolean>(false)
    let ref3 = React.useRef(null)
    useOnClickOutside(ref3, () => setSecondPopup(false))
    return (
        <div className="btc_wrapper">
            <div className="btc" onClick={() => setSecondPopup(true)}>
                <img
                    src={selectedCurrencyImg}
                    alt={selectedCurrencyTicker}
                    className="currency"
                />
                <h4>{selectedCurrencyTicker}</h4>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 15L7.5 9L16.5 9L12 15Z" fill="#23272B" />
                </svg>
            </div>{' '}
            {secondPopup && (
                <SelectBodyHead ref={ref3}>
                    {allowedCurrencies.map((item) => (
                        <div
                            key={uuidv4()}
                            className="select_card"
                            onClick={() => {
                                dispatch(setCurrency(item.ticker))
                                setSecondPopup(false)
                            }}
                        >
                            <img src={item.img} alt={item.ticker} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </SelectBodyHead>
            )}
        </div>
    )
}

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
