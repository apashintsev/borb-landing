import * as React from 'react'
import styled from 'styled-components'
import { BetVm } from '../../../@types/Game/bet'
import { allowedCurrencies } from '../../../lib/data'
import SmallChart from './SmallChart'

export interface IBetItemProps {
    bet: BetVm
}

export const BetItem: React.FunctionComponent<IBetItemProps> = ({ bet }) => {
    const betCurrency = allowedCurrencies.find((x) => x.ticker === bet.currency)
    const lastPrice = bet.points[bet.points.length]
    const directionUp = lastPrice > bet.lockPrice
    const isWin =
        (bet.betType == 0 && bet.lockPrice < lastPrice) ||
        (bet.betType == 1 && bet.lockPrice > lastPrice)

    return (
        <DataContentItem key={bet.betId}>
            <span className="center mobile-display-none">
                <img src={betCurrency?.img} alt={betCurrency?.name} />
            </span>
            <span className="center mobile-display-none">
                {bet.betType === 0 ? 'Up' : 'Down'}
            </span>
            <span className="">
                <svg
                    className={`first_td_adaptive ${
                        !directionUp && 'rotate180deg'
                    }`}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16 12L22 20H10L16 12Z"
                        fill={`var(--${directionUp ? 'green' : 'pink'})`}
                    />
                </svg>
            </span>
            <span className="center">${bet.lockPrice}</span>

            <span className="center">{bet.lockedAt + bet.timeframe}</span>
            <span className="chart_td center mobile-display-none">
                <SmallChart data0={bet.points}/>
            </span>
            <span className={`price-${isWin ? 'increase' : 'drop'} last`}>
                {isWin ? `+${bet.potentialReward}` : `-${bet.amount}`}
            </span>
        </DataContentItem>
    )
}

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

    .rotate180deg {
        transform: rotate(180deg);
    }
`
