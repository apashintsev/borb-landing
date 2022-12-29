import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { AmChart5 } from './AmChart5'
import { AmChart } from './AmChart'
import { Left } from './main'
import { Timeframes } from './Timeframes'
import { getPoints } from '../../../store/api/prices'
import { HCH } from './HCH'

export const Chart = () => {
    useUpdatePrices()
    const { currencyPrice, currency } = useAppSelector((state) => state.gameSlice)
    console.log('Chart ~ currency', currencyPrice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            getPoints({
                currency: currency,
                timeframe: 300,
                pageNumber: 0,
                pageSize: 100,
            })
        )
    }, [dispatch])

    return (
        <Left>
            <div className="left_row">
                <p className="cost">${currencyPrice}</p>
                <Timeframes />

            </div>
            {/* <AmChart5 /> */}
            {/* <AmChart /> */}
            <HCH />
            {/* <AdvancedChart widgetProps={{ theme: 'dark' }} />             */}
        </Left>
    )
}
