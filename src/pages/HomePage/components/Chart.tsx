import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { AmChart5 } from './AmChart5'
import { AmChart } from './AmChart'
import { Left } from './main'
import { Timeframes } from './Timeframes'
import { getPoints } from '../../../store/api/prices'
import { HCH } from './HCH'
import './style.scss';

export const Chart = () => {
    useUpdatePrices()
    const { currencyPrice, currency, timeframe } = useAppSelector((state) => state.gameSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            getPoints({
                currency: currency,
                timeframe: timeframe.value,
                pageNumber: 0,
                pageSize: 100,
            })
        )
    }, [currency, dispatch, timeframe.value])

    return (
        <Left>
            <div className="left_row">
                <p className="cost">${currencyPrice}</p>
                <Timeframes />
            </div>
            <div className="chart">
                {/* <AmChart5 /> */}
                {/* <AmChart /> */}
                <HCH />
            </div>
            {/* <AdvancedChart widgetProps={{ theme: 'dark' }} />             */}
        </Left>
    )
}
