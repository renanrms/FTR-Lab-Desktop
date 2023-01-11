import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartPropType {
  className?: string
  XAxis: { key: string; name: string }
  YAxis: { key: string; name: string }
  data: Object[]
}

export function Chart(props: ChartPropType) {
  return (
    <div
      className={[
        'p-8 shadow border-2 border-secondary-90 bg-surface rounded-lg',
        props.className,
      ].join(' ')}
    >
      <ResponsiveContainer width="100%" height="100%" debounce={20}>
        <LineChart width={200} height={200}>
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
      </ResponsiveContainer>
    </div>
  )
}
