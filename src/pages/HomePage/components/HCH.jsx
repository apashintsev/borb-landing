import { useState, useEffect, useRef } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useAppSelector } from '../../../hooks/redux'

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

export const HCH = () => {
    const { points } = useAppSelector((state) => state.pointsSlice)
    const { currencyPrice } = useAppSelector((state) => state.gameSlice)
    console.log('-----------', currencyPrice)

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
                // set up the updating of the chart each second
                // if (this.series.length) return;
                const series = this.series[0]
                console.log('HCH ~ this', this)

                //set marker on last point
                series?.data[series.data.length - 1]?.update({
                    marker: {
                        enabled: false,
                    },
                })

                setInterval(function () {
                    const x = new Date().getTime() // current time
                    const y = Math.random()

                    const len = series?.data.length

                    // if (series.data[len - 1]) {
                    series.data[len - 1].update(
                        {
                            marker: {
                                enabled: false,
                            },
                        },
                        false
                    )
                    // }
                    console.log('<<<<<<<first>>>>>>>', currencyPrice)
                    series.addPoint(
                        {
                            x: x,
                            y: currencyPrice,
                            // y: y,
                            marker: {
                                enabled: true,
                                radius: 4,
                            },
                        },
                        true,
                        true
                    )
                }, 1000)
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

    if (!points?.pointsList?.length) return null

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
