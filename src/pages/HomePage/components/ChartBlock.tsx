import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useUpdatePrices } from '../../../hooks/useUpdatePrices'
import { Left } from './main'
import { Timeframes } from './Timeframes'
import { getPoints } from '../../../store/api/prices'
import './style.scss'
import { Chart } from './BetChart/BetChartComponent'

export const ChartBlock = () => {
    useUpdatePrices()
    const { currencyPrice, currency, timeframe, activeBet } = useAppSelector((state) => state.gameSlice)
    const { themeName } = useAppSelector((state) => state.appSettings)
    const { points } = useAppSelector((state) => state.chartSlice)
    const dispatch = useAppDispatch()

    const chartRef = useRef<Chart>(null)

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

    useEffect(() => {
        chartRef.current?.bet();
    }, [activeBet])

    return (
        <Left>
            <div className="left_row">
                <p className="cost">${currencyPrice}</p>
                <Timeframes />
            </div>
            <div className="chart">
                <Chart ref={chartRef} points={points.pointsList} timeframe={timeframe.value} theme={themeName} />
            </div>
        </Left>
    )
}
