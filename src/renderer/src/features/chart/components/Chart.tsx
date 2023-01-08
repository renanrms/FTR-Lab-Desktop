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
  XAxis: { key: string; name: string }
  YAxis: { key: string; name: string }
  data: Object[]
}

export function Chart(props: ChartPropType) {
  return (
    <div>
      <LineChart width={500} height={250}>
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
  )
}
