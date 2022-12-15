import * as React from 'react'
import {
    Line,
    LineChart,
    ResponsiveContainer,
} from 'recharts'

interface ISmallChartProps {
    data: number[]
    isWin: boolean
}

const SmallChart: React.FunctionComponent<ISmallChartProps> = ({ data, isWin }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <Line
                    type="monotone"
                    dataKey={(v) => v}
                    stroke={`var(--${isWin ? 'green' : 'pink'})`}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default SmallChart

