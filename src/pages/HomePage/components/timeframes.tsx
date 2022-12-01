import { v4 as uuidv4 } from 'uuid'
import { Timeframe } from '../../../@types/Game/game'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { gameSlice } from '../../../store/reducers/gameSlice'

export function Timeframes() {
    const allowedTimeframes: Timeframe[] = [
        '5m',
        '15m',
        '30m',
        '1h',
        '4h',
        '24h',
    ]
    const { selectedTimeframe } = useAppSelector((state) => state.gameSlice)
    const { setTimeframe } = gameSlice.actions
    const dispatch = useAppDispatch()

    return (
        <div className="times">
            {allowedTimeframes.map((timeframe) => (
                <p
                    className={`time ${
                        selectedTimeframe === timeframe ? 'active' : ''
                    }`}
                    key={uuidv4()}
                    onClick={() => dispatch(setTimeframe(timeframe))}
                >
                    {timeframe}
                </p>
            ))}
        </div>
    )
}
