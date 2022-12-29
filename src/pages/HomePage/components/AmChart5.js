// @ts-nocheck
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

export const AmChart5 = () => {
    const { points } = useAppSelector((state) => state.pointsSlice)
    const { currencyPrice } = useAppSelector((state) => state.gameSlice)
    console.log('AmChart5 ~ currencyPrice', currencyPrice)
    console.log('00000', points)

    useLayoutEffect(() => {
        if (!points?.pointsList?.length) return;
        const pointsData = points?.pointsList.map(point => {
            // am5.time.add(new Date(point.timeStamp).getTime(), "day", 1);

            // console.log(222, new Date(point.timeStamp).getTime())
            console.log(222, Math.floor(new Date(point.timeStamp).getTime() / 1000))
            // console.log(222, point.timeStamp)
            
            return {
                date: Math.floor(new Date(point.timeStamp).getTime() / 1000) * 1000,
                value: point.value,
                // bullet: false,
            }
        }).sort((a, b) => a.date - b.date);
        
        const root = am5.Root.new("chartDiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([ am5themes_Animated.new(root) ]);

        // Generate random data
        // let value = 100;
        // function generateChartData() {
        //   const chartData = [];
        //   const firstDate = new Date();
        //   firstDate.setDate(firstDate.getDate() - 1000);
        //   firstDate.setHours(0, 0, 0, 0);

        //   for (let i = 0; i < 1000; i++) {
        //     const newDate = new Date(firstDate);
        //     newDate.setSeconds(newDate.getSeconds() + i);
        //     value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;
        //     console.log(222, newDate.getTime());
        //     chartData.push({
        //       date: newDate.getTime(),
        //       value: value
        //     });
        //   }
        //   return chartData;
        // }

        // const data = generateChartData();

        const date = new Date();
        date.setHours(0, 0, 0, 0);
        let value = 100;

        function generateData() {
            value = Math.round(Math.random() * 10 - 5 + value);

            am5.time.add(date, "day", 1);
            return { date: date.getTime(), value: value };
        }

        function generateDatas(count) {
            const data = [];
            for (let i = 0; i < count; ++i) {
                data.push(generateData());
            }
            return data;
        }

        const data = generateDatas(2000);
        // const data = pointsData;
        console.log(777, pointsData)
        console.log(333, generateDatas(2000))

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                focusable: true,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            })
        );

        const easing = am5.ease.linear;

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.5,
                groupData: false,
                extraMax: 0.1, // this adds some space in front
                extraMin: -0.1, // this removes some space form th beginning so that the line would not be cut off
                baseInterval: {
                    timeUnit: "second",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 50
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        const scrollbar = chart.set(
            "scrollbarX",
            am5xy.XYChartScrollbar.new(root, {
                orientation: "horizontal",
                height: 60
            })
        );

        const sbDateAxis = scrollbar.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        const sbValueAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        const sbSeries = scrollbar.chart.series.push(
            am5xy.LineSeries.new(root, {
                valueYField: "value",
                valueXField: "date",
                xAxis: sbDateAxis,
                yAxis: sbValueAxis
            })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueX}"
                })
            })
        );

        // tell that the last data item must create bullet
        data[data.length - 1].bullet = true;
        series.data.setAll(data);
        sbSeries.data.setAll(data);

        // Create animating bullet by adding two circles in a bullet container and
        // animating radius and opacity of one of them.
        series.bullets.push(function (root, series, dataItem) {
            // only create sprite if bullet == true in data context
            if (dataItem.dataContext.bullet) {
                const container = am5.Container.new(root, {});
                const circle0 = container.children.push(
                    am5.Circle.new(root, {
                        radius: 4,
                        fill: am5.color(0xff0000)
                    })
                );
                const circle1 = container.children.push(
                    am5.Circle.new(root, {
                        radius: 4,
                        fill: am5.color(0xff0000)
                    })
                );

                circle1.animate({
                    key: "radius",
                    to: 20,
                    duration: 1000,
                    easing: am5.ease.out(am5.ease.cubic),
                    loops: Infinity
                });
                circle1.animate({
                    key: "opacity",
                    to: 0,
                    from: 1,
                    duration: 1000,
                    easing: am5.ease.out(am5.ease.cubic),
                    loops: Infinity
                });

                return am5.Bullet.new(root, {
                    locationX: undefined,
                    sprite: container
                });
            }
        });

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set(
            "cursor",
            am5xy.XYCursor.new(root, {
                xAxis: xAxis
            })
        );
        cursor.lineY.set("visible", false);

        // Update data every second
        setInterval(function () {
            addData();
        }, 1000);

        function addData() {
            const lastDataItem = series.dataItems[ series.dataItems.length - 1 ];
            // console.log('addData ~ <<<<<<<series.dataItems>>>>>>>', series.dataItems)

            const lastValue = lastDataItem.get("valueY");
            const newValue =
                value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;
            const lastDate = new Date(lastDataItem.get("valueX"));
            const time = am5.time.add(new Date(lastDate), "second", 1).getTime();
            series.data.removeIndex(0);
            series.data.push({
                date: new Date().getTime(),
                // value: currencyPrice,
                value: newValue,
            });

            const newDataItem = series.dataItems[ series.dataItems.length - 1 ];
            newDataItem.animate({
                key: "valueYWorking",
                // to: currencyPrice,
                to: newValue,
                from: lastValue,
                duration: 600,
                easing: easing
            });

            // use the bullet of last data item so that a new sprite is not created
              newDataItem.bullets = [];
              newDataItem.bullets[0] = lastDataItem?.bullets[0];
            //   newDataItem?.bullets[0]?.get("sprite")?.dataItem = newDataItem;
            // console.log('addData ~ newDataItem?.bullets[0]?.get("sprite")', newDataItem)
            // console.log('addData ~ newDataItem?.bullets[0]?.get("sprite")', lastDataItem)
            // reset bullets
              lastDataItem.dataContext.bullet = false;
              lastDataItem.bullets = [];

            const animation = newDataItem.animate({
                key: "locationX",
                to: 0.5,
                from: -0.5,
                duration: 600
            });
            if (animation) {
                const tooltip = xAxis.get("tooltip");
                if (tooltip && !tooltip.isHidden()) {
                    animation.events.on("stopped", function () {
                        xAxis.updateTooltip();
                    });
                }
            }
        }

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        series.appear(1000);

        return () => root.dispose();
    }, [ points ]);

    return <div id="chartDiv" style={{ width: "100%", height: "500px", backgroundColor: "white" }}></div>;
    // return <AmChart id="chartDiv" />;

}
