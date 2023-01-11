import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
        'p-4 pb-12 shadow border-2 border-secondary-90 bg-surface rounded-lg',
        props.className,
      ].join(' ')}
    >
      <div className="mb-2 ml-[5%] pl-8 flex items-center">
        <div className="py-[2px] px-2 rounded-full bg-neutral-95 flex items-center mr-4">
          <div
            onClick={() => {}}
            className="w-[28px] h-[28px] hover:bg-neutral-90 rounded-full flex justify-between items-center"
          >
            <VerticalAlignBottomRoundedIcon
              sx={{
                fontSize: '20px',
                transform: 'rotate(-90deg)',
                margin: 'auto',
              }}
            ></VerticalAlignBottomRoundedIcon>
          </div>
          <div
            onClick={() => {}}
            className="w-[28px] h-[28px] hover:bg-neutral-90 rounded-full flex justify-between items-center"
          >
            <ExpandRoundedIcon
              sx={{
                fontSize: '20px',
                transform: 'rotate(90deg)',
                margin: 'auto',
              }}
            ></ExpandRoundedIcon>
          </div>
        </div>
        <div className="py-[2px] px-2 rounded-full bg-neutral-95 flex items-center">
          <div className="w-[28px] h-[28px] hover:bg-neutral-90 rounded-full flex justify-between items-center">
            <ScatterPlotRoundedIcon
              sx={{ fontSize: '20px', margin: 'auto' }}
            ></ScatterPlotRoundedIcon>
          </div>
          <div className="w-[28px] h-[28px] hover:bg-neutral-90 rounded-full flex justify-between items-center">
            <ShowChartRoundedIcon
              sx={{ fontSize: '20px', margin: 'auto' }}
            ></ShowChartRoundedIcon>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" debounce={20}>
        <LineChart width={200} height={200}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props.XAxis.key} type="number" />
          <YAxis dataKey={props.YAxis.key} />
          <Tooltip />
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
