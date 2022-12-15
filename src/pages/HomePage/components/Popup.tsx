import * as React from 'react'
import { gameSlice } from '../../../store/reducers/gameSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useUserNotifications } from '../../../hooks/useUserNotifications'
import { useOnClickOutside } from '../../../lib/useOnClickOutside'
import { Column, Head, Popup, PopupBottom, PopupContent, PopupTitle } from './main'
import { allowedCurrencies, allowedTimeframes } from '../../../lib/data'
import SmallChart from '../../../components/SmallChart/SmallChart'

export function PopupWindow() {
    useUserNotifications()
    const { isPopupOpen, closedBet } = useAppSelector((state) => state.gameSlice)
    const { setIsPopupOpen } = gameSlice.actions

    const dispatch = useAppDispatch()
    let ref = React.useRef(null)
    useOnClickOutside(ref, () => dispatch(setIsPopupOpen(false)))

    const betCurrency = allowedCurrencies.find((x) => x.ticker === closedBet.currency)
    const directionUp = closedBet.betType === 0
    const timeframe = allowedTimeframes.find((x) => x.value == closedBet.timeframe)?.name
    const isWin =
        (closedBet.betType == 0 && closedBet.lockPrice < closedBet.closePrice) ||
        (closedBet.betType == 1 && closedBet.lockPrice > closedBet.closePrice)

    return (
        <Popup show={isPopupOpen}>
            <PopupContent ref={ref}>
                <Head>
                    <PopupTitle>Trade result</PopupTitle>
                    <img src="/images/home/close.svg" alt="Close" onClick={() => dispatch(setIsPopupOpen(false))} />
                </Head>
                <div style={{ height: '100px' }}>
                    <SmallChart data={closedBet.points} isWin={isWin} />
                </div>
                <PopupBottom>
                    <Column>
                        <p>Asset</p>
                        <img src={betCurrency?.img} alt={betCurrency?.name} />
                    </Column>
                    <Column>
                        <p>Direction</p>
                        <svg
                            className={`first_td_adaptive ${!directionUp && 'rotate180deg'}`}
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 12L22 20H10L16 12Z" fill={`var(--${directionUp ? 'green' : 'pink'})`} />
                        </svg>
                    </Column>
                    <Column>
                        <p>Timeframe</p>
                        <span>{timeframe}</span>
                    </Column>
                    <Column>
                        <p>Result</p>
                        <span className={`price-${isWin ? 'increase' : 'drop'} last`}>
                            {isWin ? `+${closedBet.potentialReward} ` : `-${closedBet.amount} `}
                            USD
                        </span>
                    </Column>
                </PopupBottom>
            </PopupContent>
        </Popup>
    )
}
