import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { AmChart5 } from './AmChart5'
import { Left } from './main'
import { Timeframes } from './Timeframes'
import { getPoints } from '../../../store/api/prices'


export const Chart = () => {
    useUpdatePrices()
    const { currencyPrice, currency } = useAppSelector((state) => state.gameSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            getPoints({
                currency: currency,
                timeframe: 300,
                pageNumber: 1,
                pageSize: 500,
            })
        )
    }, [dispatch, currency])

    return (
        <Left>
            <div className="left_row">
                <p className="cost">${currencyPrice}</p>
                <Timeframes />

            </div>
            <AmChart5 />
            {/* <AdvancedChart widgetProps={{ theme: 'dark' }} />             */}
        </Left>
    )
}
