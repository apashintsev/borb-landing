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

                // console.log('e.chartX', e.chartX)
                // console.log('chart.plotLeft', chart.plotLeft)
                // console.log('e.chartY', e.chartY)
                // console.log('chart.plotTop', chart.plotTop)
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
    // console.log('<<<<<<<<', series.chart.xAxis[0].getExtremes())
    // console.log('<<<<<<<<series', series)
    const chart = series?.chart
    const lastPoint = series?.points[series?.points?.length - 1]
    console.log('positionMarker ~ 333333', series?.navigatorSeries?.baseSeries?.xAxis?.dataMax)
    // console.log('positionMarker ~ 333333', series.navigatorSeries.baseSeries)
    // console.log('<<<<<<<<points>>>>>>>>', series?.points[series?.points?.length - 1]?.plotX)
    // console.log('<<<<<<<<data>>>>>>>>', series?.data[series.data.length - 1].plotX)
    // chart.pulseMarker.animate(
    //     {
    //         x: lastPoint?.plotX - chart?.plotLeft - chart?.spacing[0],
    //         y: lastPoint?.plotY + chart?.plotTop + chart?.spacing[2] - 3,
    //     },
    //     true
    // )

    if (lastPoint?.plotX === series?.data[series.data.length - 1].plotX) {
        console.log('if ')

        chart?.pulseMarker?.animate(
            {
                x: lastPoint.plotX - chart.plotLeft - chart.spacing[0],
                y: lastPoint.plotY + chart.plotTop + chart.spacing[2] - 3,
            },
            true
        )
    } else {
        console.log('else')

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
    const { currencyPrice, currency, timeframe } = useAppSelector((state) => state.gameSlice)

    // console.log('-----------', currencyPrice)

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
                // if (this.series.length) return;
                const series = this.series[0]
                console.log('HCH ~ this', this)

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

                        // console.log('newPrice=========>4', newPrice)

                        // if ((x - series.data[len - 1].x > timeframe.value * 1000)) {
                        //set marker on last point
                        // series?.data[len - 1]?.update({
                        // marker: {
                        //     enabled: false,
                        // },
                        // })

                        // series.points[len - 1].update(
                        // series.data[len - 1].update(
                        // {
                        // marker: {
                        //     enabled: false,
                        // },
                        // },
                        // false
                        // )

                        series.addPoint(
                            {
                                x: x,
                                y: newPrice + Math.random(),
                                // marker: {
                                //     enabled: true,
                                //     fillColor: '#ff577e',
                                //     radius: 5,
                                // },
                                // className: 'dot',
                            },
                            true,
                            true
                        )
                        // } else {
                        //     series.data[len - 1].update(
                        //         {
                        //             y: newPrice,
                        //             marker: {
                        //                 enabled: true,
                        //                 fillColor: '#ff577e',
                        //                 radius: 5,
                        //             },
                        //             className: 'dot',
                        //         },
                        //         true,
                        //         true
                        //     )
                        // }
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

        // minPadding: 0.1,
        // maxPadding: 0.1,
        // ordinal: false,
        // events: {
        //     setExtremes: function (e) {
        //         if (e.trigger) {
        //             e.preventDefault()
        //             const navigator = this.chart.xAxis[1]
        //             let { min, max } = e
        //             const range = navigator.max - navigator.min
        //             console.log('HCH ~ e---------<<<<<<<<<', 
                    // this.series[0].points[series.points.length - 1].plotX === this.series[0]?.data?.[series?.data?.length - 1]?.plotX
                    // )
                    // if (max === navigator.max) max += 0.1 * range
                    // if (min === navigator.min) min -= 0.1 * range
                    // this.setExtremes(min, max)
                // }
            // },
        // },
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
                legend: {
                    enabled: false,
                },
                exporting,
                plotOptions,
            }}
        />
    )
}
