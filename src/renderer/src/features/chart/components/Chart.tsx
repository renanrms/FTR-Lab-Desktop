import React, { useLayoutEffect, useRef, useState } from 'react'
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

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

// function useComponentSize<T>(ref: React.RefObject<T>) {
//   const [size, setSize] = useState([0, 0])
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([ref.current?.offsetWidth || 0, ref.current?.offsetHeight || 0])
//     }
//     ref.current.addEventListener('resize', updateSize)
//     updateSize()
//     return () => ref.current.removeEventListener('resize', updateSize)
//   }, [])
//   return size
// }

export function Chart(props: ChartPropType) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const width = chartContainerRef?.current?.offsetWidth || 500
  const height = chartContainerRef?.current?.offsetHeight || 250

  useWindowSize()

  return (
    <div
      className={[
        'p-8 shadow border-2 border-secondary-90 rounded-lg',
        props.className,
      ].join(' ')}
    >
      <div
        className="w-full h-full rounded bg-neutral-95"
        ref={chartContainerRef}
      >
        <LineChart width={width} height={height}>
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
