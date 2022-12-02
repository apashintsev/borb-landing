import { useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { Left } from './main'
import { Timeframes } from './Timeframes'

export function Chart() {
        const { selectedCurrencyPrice } = useAppSelector(
            (state) => state.gameSlice
        )
    useUpdatePrices()
    return (
        <Left>
            <div className="left_row">
                <p className="cost">${selectedCurrencyPrice}</p>
                <Timeframes />
            </div>
        </Left>
    )
}
