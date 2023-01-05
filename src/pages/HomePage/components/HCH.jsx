import { useState, useEffect, useRef } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useAppSelector } from '../../../hooks/redux'

import { HubConnectionBuilder } from '@microsoft/signalr'
import * as SignalR from '@aspnet/signalr'

import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module

;(function (H) {
    Highcharts.Chart.prototype.callbacks.push(function (chart) {
        H.addEvent(
            chart.container,
            document.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel',
            function (event) {
                const axis = chart.xAxis[0],
                    extremes = axis.getExtremes(),
                    min = extremes.min,
                    max = extremes.max,
                    range = max - min,
                    precision = range / 150,
                    e = chart.pointer.normalize(event)

                let delta = e.deltaY
                const prevent = true

                if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                    const proportion = (e.chartX - chart.plotLeft) / chart.plotWidth
                    axis.setExtremes(min - proportion * delta * precision, max)

                    // Crosshair handling logic
                    chart.yAxis.forEach((axis) => {
                        if (
                            !(axis.pos < e.chartY && axis.pos + axis.len > e.chartY) &&
                            chart.hoverPoint &&
                            axis.cross
                        ) {
                            delete axis.cross.e
                        }
                    })

                    if (prevent) {
                        if (e) {
                            if (e.preventDefault) {
                                e.preventDefault()
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation()
                            }
                            e.cancelBubble = true
                        }
                    }
                }
            }
        )
    })
})(Highcharts)

function positionMarker(series) {
    const chart = series?.chart
    const lastPoint = series?.points[series?.points?.length - 1]

    if (lastPoint?.plotX === series?.data[series.data.length - 1].plotX) {
        chart?.pulseMarker?.animate(
            {
                x: lastPoint.plotX - chart.plotLeft - chart.spacing[0],
                y: lastPoint.plotY + chart.plotTop + chart.spacing[2] - 3,
            },
            true
        )
    } else {
        chart?.pulseMarker?.animate(
            {
                x: lastPoint.plotX + 1111,
                y: lastPoint.plotY + 1111,
            },
            true
        )
    }
}

export const HCH = () => {
    const { points } = useAppSelector((state) => state.pointsSlice)
    const { currency, timeframe } = useAppSelector((state) => state.gameSlice)

    const [pointsData, setPointsData] = useState([])
    const chartRef = useRef(null)

    useEffect(() => {
        const pointsLength = points?.pointsList?.length
        if (!pointsLength) return
        setPointsData(
            points?.pointsList
                .map((point, index) => {
                    return {
                        x: new Date(point.timeStamp).getTime(),
                        y: point.value,
                    }
                })
                .sort((a, b) => a.x - b.x)
        )
    }, [points])

    useEffect(() => {
        setSeries([
            {
                name: 'Price value',
                data: pointsData,
            },
        ])
    }, [pointsData])

    const [series, setSeries] = useState([
        {
            name: 'Price value',
            data: pointsData,
        },
    ])

    const [chart] = useState({
        type: 'spline',
        marginRight: 50,
        events: {
            load: function () {
                const chart = this
                chart.pulseMarker = this.renderer
                    .text("<span class='mgo-widget-call_pulse'></span>", 200, 200, true)
                    .add()

                // set up the updating of the chart each second
                const series = this.series[0]
                // console.log('HCH ~ this', this)

                positionMarker(this?.chart?.series?.[0])

                const newConnection = new HubConnectionBuilder()
                    .withUrl(`https://borbfinance.ru/wssrates`, {
                        withCredentials: false,
                        skipNegotiation: true,
                        transport: SignalR.HttpTransportType.WebSockets,
                    })
                    .withAutomaticReconnect()
                    .build()

                newConnection.start().then(() => {
                    newConnection.on('NewPriceSetted', (payload) => {
                        const newPrice = payload[currency.ticker.toLocaleLowerCase()]

                        const len = series?.data.length

                        const x = new Date().getTime() // current time

                        // console.log('newPrice=========>', newPrice)

                        if (x - series.data[len - 1].x > timeframe.value * 1000) {
                            series.addPoint(
                                {
                                    x: x,
                                    y: newPrice,
                                },
                                true,
                                true
                            )
                        } else {
                            series.data[len - 1].update(
                                {
                                    y: newPrice,
                                },
                                true,
                                true
                            )
                        }
                        positionMarker(series)
                    })
                })
            },
        },
    })

    const [time] = useState({
        useUTC: false,
    })
    const [rangeSelector] = useState({
        enabled: false,
    })
    const [xAxis] = useState({
        type: 'datetime',
        tickPixelInterval: 150,
    })
    const [yAxis] = useState({
        opposite: false,
        plotLines: [
            {
                value: 0,
                width: 1,
                color: '#808080',
            },
        ],
    })
    const [exporting] = useState({
        enabled: true,
    })
    const [plotOptions] = useState({
        series: {
            marker: {
                enabled: false,
            },
            animation: {
                duration: 1200,
            },
            enableMouseTracking: true,
        },
    })
    const [legend] = useState({
        enabled: false,
    })

    if (!points?.pointsList?.length || points.isLoading) return null

    return (
        <HighchartsReact
            constructorType={'stockChart'}
            allowChartUpdate={true}
            highcharts={Highcharts}
            ref={chartRef}
            options={{
                chart,
                series,
                time,
                rangeSelector,
                xAxis,
                yAxis,
                legend,
                exporting,
                plotOptions,
            }}
        />
    )
}
