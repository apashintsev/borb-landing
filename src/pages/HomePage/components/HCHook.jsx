import { useState, useEffect, useRef } from "react";
// Import Highcharts
import Highcharts, { Chart } from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from '../../../hooks/redux'
// import Highcharts, { Chart } from "highcharts";

import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

const getRandomData = () => {
    // generate an array of random data
    const data = [];
    const time = (new Date()).getTime();

    for (let i = -1999; i <= 0; i += 1) {
        data.push([
            time + i * 1000,
            Math.round(Math.random() * 1000),
            // {y: 54.4, className: 'customClass'}
        ]);
        // data.push({
        //     x: time + i * 1000,
        //     y:Math.round(Math.random() * 1000)
        // });
    }
    console.log('HCH ~ constructor ~ data', data)
    return data;
}


(function (H) {
    Highcharts.Chart.prototype.callbacks.push(function (chart) {
        H.addEvent(chart.container, document.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel',
            function (event) {
                const axis = chart.xAxis[ 0 ],
                    extremes = axis.getExtremes(),
                    min = extremes.min,
                    max = extremes.max,
                    range = max - min,
                    precision = range / 150,
                    e = chart.pointer.normalize(event);

                let delta = e.deltaY;
                const prevent = true;

                if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                    const proportion = (e.chartX - chart.plotLeft) / chart.plotWidth;
                    axis.setExtremes(min - proportion * delta * precision, max)

                    // Crosshair handling logic
                    chart.yAxis.forEach(axis => {
                        if (!(axis.pos < e.chartY && axis.pos + axis.len > e.chartY) && chart.hoverPoint && axis.cross) {
                            delete axis.cross.e
                        }
                    })

                    if (prevent) {
                        if (e) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                        }
                    }
                }
            });
    });
}(Highcharts));

export const HCH = () => {
    // console.log(333, getRandomData())

    const { points } = useAppSelector((state) => state.pointsSlice)
    const { currencyPrice, currency } = useAppSelector((state) => state.gameSlice)

    const [ pointsData, setPointsData ] = useState([ { "x": 1672074291288, "y": 16319 }, { "x": 1672073992998, "y": 16671 } ]);
    // useEffect(() => {
    //     const pointsLength = points?.pointsList?.length
    // if (!pointsLength) return;
    // setPointsData(
    //     points?.pointsList.map((point, index) => {

    //         return {
    //             x: new Date(point.timeStamp).getTime() + (index - pointsLength) * 1000,
    //             y: point.value,
    //         }
    //     })
    // )

    // setPointsData([ { "x": 1672074291288, "y": 16319 }, { "x": 1672073992998, "y": 16671 }, { "x": 1672073693475, "y": 16101 }, { "x": 1672073394414, "y": 16925 }, { "x": 1672073095075, "y": 16953 }, { "x": 1672072796850, "y": 16648 }, { "x": 1672072497365, "y": 16547 }, { "x": 1672072198349, "y": 16502 }, { "x": 1672071599797, "y": 16550 } ])
    // }, [ points ])

    // interface IChartRef {
    //     chart: Chart;
    //     container: React.RefObject<HTMLDivElement>;
    // }
    // function translateGraph(wrap) {
    //     const series = wrap?.series;

    //     if (series?.length > 1) {
    //       for (let i = 0; i < wrap.series[0].points.length; i++) {
    //         let pointsPos = [];
    //         let pointsGroup = [];

    //         series.forEach(function (series) {
    //           let point = series.points[i];
    //           if (series.visible) {
    //             let args = point.shapeArgs;
    //             pointsGroup.push(series.points[i]);
    //             pointsPos.push({
    //               transX: args.x
    //             });
    //           }
    //         });

    //         pointsGroup
    //           .forEach(function (point, i) {
    //             const chart = point.series.chart;
    //             const plotHeight = chart.plotSizeX - 20;
    //             if (point.graphic) {
    //               point.graphic.attr({
    //                 x: pointsPos[i].transX
    //               });
    //             }

    //             if (point.dataLabel) {
    //               point.dataLabel.attr({
    //                 y: plotHeight - pointsPos[i].transX
    //               });
    //             }
    //           });
    //       }
    //     }
    //   }
    const chartRef = useRef(null);
    // useEffect(() => {
    // if (chartRef.current) {
    // chartRef.current.chart.redraw();
    // translateGraph.call(chartRef?.current?.chart)
    // }
    // }, [ pointsData ]);

    // console.log(900000, JSON.stringify(pointsData));

    const [ series, setSeries ] = useState([ {
        name: 'Random data',
        // data: pointsData,
        data: (function () {
            // generate an array of random data
            const data = [];
            const time = (new Date()).getTime();
            for (let i = -199; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random(),
                    className: 'customClass',
                    marker: {
                        enabled: true,
                        radius: 4,
                    }
                });
            }
            return data;
        }())
    } ])

    // useEffect(() => {
    //     setSeries([{
    //         name: 'Random data',
    //         data: pointsData,
    //     }])
    // }, [pointsData])


    const [ chart ] = useState({
        type: 'spline',
        marginRight: 100,
        events: {
            load: function () {
                // setTimeout(() => {
                //     chart.series[0].setData(pointsData);
                //     chart.redraw();
                // }, 10000);

                // set up the updating of the chart each second
                const series = this.series[ 0 ];
                console.log('HCH ~ this', this)

                //set marker on last point
                series.data[ series.data.length - 1 ].update({
                    marker: {
                        enabled: false
                    }
                });


                setInterval(function () {
                    const x = (new Date()).getTime(); // current time
                    const y = Math.random();

                    const len = series?.data.length;

                    // function toRed() {
                    //     series?.data[ series.data.length - 1 ].animate({
                    //         fill: '#ff0000'
                    //     }, {
                    //         duration: 300
                    //     }, toBlue);
                    // }

                    // function toBlue() {
                    //     series?.data[ series.data.length - 1 ].animate({
                    //         fill: 'rgb(124, 181, 236)'
                    //     }, {
                    //         duration: 300
                    //     }, toRed);
                    // }

                    // toRed();

                    if (series.data[ len - 1 ]) {

                        // series.data[len - 1].update({
                        //     marker: {
                        //         enabled: false
                        //     }
                        // }, false);
                    }


                    series.addPoint({
                        x: x,
                        // y: currencyPrice,
                        y: y,
                        marker: {
                            // symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)',
                            enabled: true,
                            radius: 4
                        }
                    }, true, true);
                }, 1000);
            }
        }
    })
    const [ time ] = useState({
        useUTC: false
    })
    const [ rangeSelector ] = useState({
        selected: 1,
        enabled: false
    })
    const [ title ] = useState({
        text: 'Live random data'
    })
    const [ xAxis ] = useState({
        type: 'datetime',
        tickPixelInterval: 150
    })
    const [ yAxis ] = useState({
        opposite: false,
        // title: {
        //     text: 'Value'
        // },
        plotLines: [ {
            value: 0,
            width: 1,
            color: '#808080'
        } ]
    })
    const [ exporting ] = useState({
        enabled: true
    })
    const [ plotOptions ] = useState({
        series: {
            marker: {
                enabled: false
            },
            animation:{
                duration:1200
            },
            // enableMouseTracking: true, //fasle
        }
    })


    // if (!points?.pointsList?.length) return null;

    return (
        <HighchartsReact
            constructorType={"stockChart"}
            allowChartUpdate={true}
            // ref={this.chartComponent}
            highcharts={Highcharts}
            ref={chartRef}
            options={{
                chart,
                series,
                time,
                rangeSelector,
                title,
                xAxis,
                yAxis,
                legend: {
                    enabled: false
                },
                exporting,
                plotOptions,
            }}
        />
    );
}

