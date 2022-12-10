
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { allowedTimeframes } from '../../../lib/data'
import { gameSlice } from '../../../store/reducers/gameSlice'

export function Timeframes() {
    const { selectedTimeframe } = useAppSelector((state) => state.gameSlice)
    const { setTimeframe } = gameSlice.actions
    const dispatch = useAppDispatch()

    return (
        <div className="times">
            {allowedTimeframes.map((timeframe, _idx) => (
                <p
                    className={`time ${
                        selectedTimeframe.name === timeframe.name
                            ? 'active'
                            : ''
                    }`}
                    key={_idx}
                    onClick={() => dispatch(setTimeframe(timeframe.name))}
                >
                    {timeframe.name}
                </p>
            ))}
        </div>
    )
}
