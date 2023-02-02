import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { BetChart } from './BetChart'
interface ChartProps {
    points: { timeStamp: string; value: number }[]
    timeframe: number
    theme: string
}
export interface Chart {
    bet(): void
    getBet(): { x: number; y: number }
}
export const Chart = forwardRef<Chart, ChartProps>((props, ref) => {
    const { points, timeframe, theme } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [chart, setChart] = useState<null | BetChart>(null)
    useImperativeHandle(
        ref,
        () => ({
            bet() {
                chart?.setBet(!chart.bet)
            },
            getBet() {
                return chart?.bet
            },
        }),
        [chart?.bet]
    )

    useEffect(() => {
        if (canvasRef.current) {
            const chart = new BetChart(canvasRef.current)
            setChart(chart)
            return () => chart.destroy()
        }
    }, [canvasRef])

    useEffect(() => {
        chart?.setOptions({ points, timeframe, theme })
    }, [chart, points, timeframe, theme])

    return <canvas ref={canvasRef} />
})
