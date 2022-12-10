import { AdvancedChart } from 'react-tradingview-embed'
import { useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { Left } from './main'
import { Timeframes } from './Timeframes'

export function Chart() {
    const { currencyPrice } = useAppSelector((state) => state.gameSlice)
    useUpdatePrices()
    return (
        <Left>
            <div className="left_row">
                <p className="cost">${currencyPrice}</p>
                <Timeframes />

            </div>
                <AdvancedChart widgetProps={{ theme: 'dark' }} />            
        </Left>
    )
}
