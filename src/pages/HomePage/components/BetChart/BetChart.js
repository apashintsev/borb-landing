import { Chart } from 'chart.js/auto'
import 'chartjs-adapter-moment'
import './BetChart.css'

export class BetChart {
    constructor(element, options = {}) {
        this.options = options
        this.options.pad = this.options.pad == null ? 10000 : this.options.pad
        this.options.animationDuration = this.options.animationDuration == null ? 4000 : this.options.animationDuration
        this.bet = null
        this.chart = null
        this.element = element
        this.corsair = { x: 0, y: 0 }
        this.__makeChart()
    }

    destroy() {
        if (!this.chart) {
            return
        }

        this.chart.destroy()
        this.chart = null
        cancelAnimationFrame(this.drawFrame)
    }

    setOptions({ points, timeframe, theme }) {
        this.points = points.map((p) => ({ x: new Date(p.timeStamp).getTime(), y: p.value })).sort((a, b) => a.x - b.x)
        if (this.bet == null && this.timeframe !== timeframe) {
            this.isFirstPoint = true
        }
        this.timeframe = timeframe
        this.theme = theme
        this.__updateChart()
    }

    setBet(bet) {
        this.isFirstPoint = true
        if (bet) {
            this.bet = this.points[this.points.length - 1]
            this.__updateChart()
            return
        }
        this.bet = null
        this.__updateChart()
    }

    __makeChart() {
        this.destroy()
        this.chart = new Chart(this.element, {
            type: 'line',
            options: {
                normalized: true,
                maintainAspectRatio: false,
                responsive: true,
                events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                animations: {
                    x: {
                        duration: 0,
                    },
                    y: {
                        duration: 0,
                    },
                    radius: {
                        duration: 400,
                    },
                    backgroundColor: {
                        duration: 0,
                    },
                    borderWidth: {
                        duration: 0,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                        axis: 'x',
                        intersect: false,
                        mode: 'nearest',
                        position: 'nearest',
                        external: (ctx) => {
                            let tooltipEl = document.getElementById('BetChartTooltip')
                            if (!tooltipEl) {
                                tooltipEl = document.createElement('div')
                                tooltipEl.id = 'BetChartTooltip'
                                document.body.appendChild(tooltipEl)
                            }

                            tooltipEl.className = `BetChartTooltip ${this.theme}`

                            const tooltipModel = ctx.tooltip
                            tooltipEl.style.opacity = '1'
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = '0'
                                return
                            }

                            tooltipEl.classList.remove('above', 'below', 'no-transform')
                            tooltipEl.style.left = `${tooltipModel.caretX}px`
                            tooltipEl.style.top = `${tooltipModel.caretY}px`
                            let x = '0'
                            if (tooltipModel.xAlign === 'center') {
                                x = '-50%'
                            } else if (tooltipModel.xAlign === 'left') {
                                x = '0'
                            } else if (tooltipModel.xAlign === 'right') {
                                x = '-100%'
                            }
                            let y = '0'
                            if (tooltipModel.yAlign === 'center') {
                                y = '-50%'
                            } else if (tooltipModel.yAlign === 'left') {
                                y = '0'
                            } else if (tooltipModel.yAlign === 'right') {
                                y = '-100%'
                            }
                            tooltipEl.style.transform = `
                                translate(${x}, ${y})
                            `

                            const date = new Date(tooltipModel.dataPoints[0].raw.x)
                            const value = tooltipModel.dataPoints[0].raw.y
                            var mS = [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'June',
                                'July',
                                'Aug',
                                'Sept',
                                'Oct',
                                'Nov',
                                'Dec',
                            ]
                            const date1 = `${mS[date.getMonth()]} ${date.getDate()}`

                            let seconds = date.getSeconds().toString()
                            if (seconds.length < 2) {
                                seconds = '0' + seconds
                            }
                            let minutes = date.getMinutes().toString()
                            if (minutes.length < 2) {
                                minutes = '0' + minutes
                            }
                            let hours = date.getHours()
                            if (hours > 12) {
                                hours = `${hours - 12}`
                                seconds += ' PM'
                            } else {
                                hours = `${hours}`
                                seconds += ' AM'
                            }

                            const date2 = `${hours}:${minutes}:${seconds}`
                            tooltipEl.innerHTML = `
                                <div class='content'>
                                    <div class='line-1'>
                                        <div class='text'>${date1}</div>
                                        <div class='grey'>${date2}</div>
                                    </div>
                                    <div class='line-2'>
                                        <div class='grey'>Price:</div>
                                        <div class='text value'>${value.toFixed(2)}</div>
                                    </div>
                                </div>
                            `
                        },
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: !!this.options.displayAxis,
                        type: 'time',
                        grid: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 10,
                            color: this.theme === 'light' ? '#333333' : '#aaaaaa',
                            callback: (tickValue) => {
                                const date = new Date(tickValue)
                                let seconds = date.getSeconds().toString()
                                if (seconds.length < 2) {
                                    seconds = '0' + seconds
                                }
                                let minutes = date.getMinutes().toString()
                                if (minutes.length < 2) {
                                    minutes = '0' + minutes
                                }
                                let hours = date.getHours().toString()
                                if (hours.length < 2) {
                                    hours = '0' + hours
                                }
                                if (this.timeframe === 300) {
                                    return `${hours}:${minutes}:${seconds}`
                                }
                                if (this.timeframe === 900) {
                                    return `${hours}:${minutes}:${seconds}`
                                }
                                if (this.timeframe === 1800) {
                                    return `${hours}:${minutes}:${seconds}`
                                }
                                return new Date(tickValue).toLocaleString()
                            },
                        },
                    },
                    y: {
                        display: !!this.options.displayAxis,
                        stacked: true,
                        title: {
                            color: this.theme === 'light' ? '#333333' : '#aaaaaa',
                        },
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: this.theme === 'light' ? '#333333' : '#aaaaaa',

                            callback: (value, index, ticks) => {
                                if (value < 1000) {
                                    return value.toFixed(2)
                                }
                                value = Math.floor(value)
                                const str = value.toFixed(0)
                                const k = Math.floor((str.length - 1) / 3)
                                if (str.slice(-k * 3, -k * 3 + 1) !== '0') {
                                    return (
                                        str.slice(0, -k * 3) +
                                        '.' +
                                        str.slice(-k * 3, -k * 3 + 1) +
                                        Array(k).fill('k').join('')
                                    )
                                }
                                return str.slice(0, -k * 3) + Array(k).fill('k').join('')
                            },
                        },
                    },
                },
            },
            plugins: [
                {
                    id: 'main',
                    afterEvent: (chart, args) => {
                        const { inChartArea } = args
                        const { x, y } = args.event

                        this.corsair = { x, y, draw: inChartArea }
                    },
                },
            ],
            data: {
                datasets: [
                    {
                        data: [],
                        fill: (ctx) => {
                            if (!ctx.chart.chartArea) {
                                return
                            }
                            if (ctx.chart.data.datasets[0].data.length === 0) {
                                return
                            }
                            return {
                                target: {
                                    value: this.bet ? this.bet.y : 0,
                                },
                                below: this.__belowGradient(),
                                above: this.__aboveGradient(),
                            }
                        },
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        pointHitRadius: 10,
                        pointBackgroundColor: (ctx) => {
                            if (!ctx.chart.chartArea) {
                                return null
                            }
                            return this.__getGradient(ctx.chart)
                        },
                        pointHoverBackgroundColor: (ctx) => {
                            if (!ctx.chart.chartArea) {
                                return null
                            }
                            return this.__getGradient()
                        },
                        pointBorderWidth: 0,
                        pointHoverBorderWidth: 0,
                        borderWidth: 2,
                        tension: 0.3,
                        spanGaps: true,
                        segment: {
                            borderColor: (ctx) => {
                                if (!ctx.chart.chartArea) {
                                    return null
                                }
                                return this.__getGradient()
                            },
                        },
                    },
                ],
            },
        })
        const chartDraw = this.chart.draw
        this.chart.draw = () => {
            chartDraw.call(this.chart)
            this.__drawCorsair()
            this.__drawBullet()
        }
        const draw = () => {
            this.chart.draw()
            this.drawFrame = requestAnimationFrame(draw)
        }
        this.drawFrame = requestAnimationFrame(draw)
    }

    __updateChart() {
        if (this.addPointAnimationFrame) {
            cancelAnimationFrame(this.addPointAnimationFrame)
        }
        let points
        if (this.bet != null) {
            points = this.points.filter((p) => {
                if (p.x === this.bet.x) {
                    return true
                }
                if (
                    p.x > this.bet.x &&
                    new Date(p.x).getTime() <=
                        new Date(this.bet.x).getTime() + this.timeframe * 1000 + 60000 + this.options.pad
                ) {
                    return true
                }
                return false
            })
        } else {
            points = this.points.filter((p) => {
                if (new Date(p.x).getTime() >= Date.now() - this.timeframe * 1000 - 60000 - this.options.pad) {
                    return true
                }
                return false
            })
            console.log(points)
        }
        const dataset = this.chart.data.datasets[0]
        let actualPoints = points
        if (!this.isFirstPoint && dataset.data.length > 0) {
            if (actualPoints.length <= dataset.data.length && this.bet != null) {
                dataset.data.length = actualPoints.length
                actualPoints = []
            } else {
                actualPoints = actualPoints.filter((p) => {
                    if (p.x < dataset.data[dataset.data.length - 1].x) {
                        return false
                    }
                    return true
                })
                dataset.data.pop()
                console.log(actualPoints, dataset.data)
            }
        } else {
            dataset.data = []
        }
        this.isFirstPoint = false
        if (actualPoints.length > 0) {
            const detailPoints = [actualPoints[0]]
            for (let i = 0; i < actualPoints.length - 1; i++) {
                const p1 = actualPoints[i]
                const p2 = actualPoints[i + 1]
                let len = 72
                if (this.timeframe > 60 * 60) {
                    len = 16
                }
                if (this.timeframe > 60 * 60 * 12) {
                    len = 1
                }

                for (let j = 0; j < len; ++j) {
                    let f = (j + 1) / (len + 1)
                    detailPoints.push({
                        x: p1.x * (1 - f) + p2.x * f,
                        y: p1.y * (1 - f) + p2.y * f,
                    })
                }
                detailPoints.push(p2)
            }
            dataset.data.push(detailPoints[0])
            let currentI = 1
            const time = Date.now()
            const addPoint = () => {
                const now = Math.min(
                    Math.floor(((0.5 * (Date.now() - time)) / 1000) * (detailPoints.length - 1)),
                    detailPoints.length - 1
                )
                while (currentI < now) {
                    const last = dataset.data[dataset.data.length - 1]
                    if (actualPoints.indexOf(last) < 0) {
                        dataset.data.splice(dataset.data.length - 1, 1)
                    }
                    dataset.data.push(detailPoints[currentI])
                    ++currentI
                    if (currentI >= detailPoints.length - 1) {
                        break
                    }
                }
                this.chart.update()
                if (currentI >= detailPoints.length - 1) {
                    return
                }
                this.addPointAnimationFrame = requestAnimationFrame(addPoint)
            }
            this.addPointAnimationFrame = requestAnimationFrame(addPoint)
        }
        const min = points.reduce((v, p) => Math.min(v, p.y), points[0].y)
        const max = points.reduce((v, p) => Math.max(v, p.y), points[0].y)
        if (min === max) {
            this.chart.options.scales.y.min = min - 1
            this.chart.options.scales.y.max = max + 1
        } else {
            this.chart.options.scales.y.min = min - (max - min) * 0.2
            this.chart.options.scales.y.max = max + (max - min) * 0.2
        }
        this.chart.options.scales.x.min = points[0].x
        this.chart.options.scales.x.max = points[points.length - 1].x
        if (this.bet != null) {
            this.chart.options.scales.x.min = points[0].x
            this.chart.options.scales.x.max = points[0].x + this.timeframe * 1000

            requestAnimationFrame(() => {
                const { bottom } = this.chart.chartArea
                const { y } = this.chart.scales
                const gradientBorder = this.chart.ctx.createLinearGradient(0, 0, 0, bottom)
                let shift = y.getPixelForValue(this.bet.y) / bottom
                shift = Math.max(Math.min(shift, 1), 0)
                gradientBorder.addColorStop(0, 'rgba(0, 240, 194, 1)')
                gradientBorder.addColorStop(shift, 'rgba(0, 240, 194, 1)')
                gradientBorder.addColorStop(shift, 'rgba(255, 45, 116, 1)')
                gradientBorder.addColorStop(1, 'rgba(255, 45, 116, 1)')
                this.gradient = gradientBorder
            })
        }
        const d = this.chart.options.scales.x.max - this.chart.options.scales.x.min
        this.chart.options.scales.x.min -= d * 0.004
        this.chart.options.scales.x.max += d * 0.004
        this.chart.update()
    }

    __drawBullet() {
        if (!this.bet) {
            return
        }

        const p = this.chart.data.datasets[0].data[this.chart.data.datasets[0].data.length - 1]
        if (!p) {
            return
        }

        const { ctx } = this.chart
        ctx.save()
        ctx.beginPath()
        const radius = ((Date.now() / 1000) % 1) * 10
        ctx.arc(
            this.chart.scales.x.getPixelForValue(p.x),
            this.chart.scales.y.getPixelForValue(p.y),
            5,
            0,
            2 * Math.PI,
            false
        )
        ctx.closePath()
        ctx.fillStyle = this.gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(
            this.chart.scales.x.getPixelForValue(p.x),
            this.chart.scales.y.getPixelForValue(p.y),
            radius,
            0,
            2 * Math.PI,
            false
        )
        ctx.globalAlpha = 1 - radius / 10
        ctx.fill()

        ctx.closePath()
        ctx.restore()
    }

    __drawCorsair() {
        const { left, right, bottom, top } = this.chart.chartArea
        const { x, y, draw } = this.corsair
        if (!draw) {
            return
        }
        const { ctx } = this.chart
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#999999'
        ctx.setLineDash([3, 3])
        ctx.moveTo(x, bottom)
        ctx.lineTo(x, top)
        ctx.moveTo(left, y)
        ctx.lineTo(right, y)
        ctx.stroke()
        ctx.restore()
    }

    __getGradient(chart) {
        chart = chart == null ? this.chart : chart
        const { bottom } = chart.chartArea
        const { y } = chart.scales
        const gradientBorder = chart.ctx.createLinearGradient(0, 0, 0, bottom)
        if (!this.bet) {
            if (this.theme === 'light') {
                gradientBorder.addColorStop(0, 'rgba(66, 66, 66, 1)')
                gradientBorder.addColorStop(1, 'rgba(100, 100, 100, 1)')
            } else {
                gradientBorder.addColorStop(0, 'rgba(240, 240, 240, 1)')
                gradientBorder.addColorStop(1, 'rgba(200, 200, 200, 1)')
            }
        } else {
            let shift = y.getPixelForValue(this.bet.y) / bottom
            shift = Math.max(Math.min(shift, 1), 0)
            gradientBorder.addColorStop(0, 'rgba(0, 240, 194, 1)')
            gradientBorder.addColorStop(shift, 'rgba(0, 240, 194, 1)')
            gradientBorder.addColorStop(shift, 'rgba(255, 45, 116, 1)')
            gradientBorder.addColorStop(1, 'rgba(255, 45, 116, 1)')
        }
        return gradientBorder
    }

    __belowGradient() {
        const { bottom } = this.chart.chartArea
        const { y } = this.chart.scales
        let gradientBorder
        if (!this.bet) {
            return 'rgba(0, 0, 0, 0)'
        } else {
            gradientBorder = this.chart.ctx.createLinearGradient(0, y.getPixelForValue(this.bet.y), 0, bottom)
            gradientBorder.addColorStop(0, 'rgba(255, 45, 116, 0)')
            gradientBorder.addColorStop(1, 'rgba(255, 45, 116, 0.5)')
        }
        return gradientBorder
    }

    __aboveGradient() {
        const { top, bottom } = this.chart.chartArea
        const { y } = this.chart.scales
        let gradientBorder
        if (!this.bet) {
            gradientBorder = this.chart.ctx.createLinearGradient(0, bottom, 0, top)
            gradientBorder.addColorStop(0, 'rgba(128, 128, 128, 0)')
            gradientBorder.addColorStop(1, 'rgba(128, 128, 128, 0.3)')
        } else {
            gradientBorder = this.chart.ctx.createLinearGradient(0, y.getPixelForValue(this.bet.y), 0, top)
            gradientBorder.addColorStop(0, 'rgba(0, 240, 194, 0)')
            gradientBorder.addColorStop(1, 'rgba(0, 240, 194, 0.5)')
        }
        return gradientBorder
    }
}
