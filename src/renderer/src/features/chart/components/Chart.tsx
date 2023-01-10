import React, { useEffect, useRef, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface ChartPropType {
  className?: string
  XAxis: { key: string; name: string }
  YAxis: { key: string; name: string }
  data: Object[]
}

export function Chart(props: ChartPropType) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const chartWidth = chartContainerRef?.current?.offsetWidth || 500
  const chartHeight = chartContainerRef?.current?.offsetHeight || 250

  // Força uma segunda renderização para ajustar o tamanho do gráfico.
  const [, updateState] = useState({})
  useEffect(() => {
    updateState({})
  }, [])

  console.log(chartWidth)
  console.log(chartHeight)

  return (
    <div className={['', props.className].join(' ')}>
      <div className="w-full h-full m-2 bg-neutral-95" ref={chartContainerRef}>
        <LineChart width={chartWidth} height={chartHeight}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props.XAxis.key} type="number" />
          <YAxis dataKey={props.YAxis.key} />
          <Tooltip />
          <Legend />
          <Line
            dataKey={props.YAxis.key}
            data={props.data}
            name={props.YAxis.name}
          />
        </LineChart>
      </div>
    </div>
  )
}
