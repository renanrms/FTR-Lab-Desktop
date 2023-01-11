import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import IconButton from '@mui/material/IconButton'

import {
  Label,
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
        'p-4 pb-16 shadow border-2 border-secondary-90 bg-neutral-100 rounded-lg',
        props.className,
      ].join(' ')}
    >
      <div className="mb-2 ml-[68px] flex items-center">
        <div className="rounded-full bg-surface-l1-light flex items-center mr-4">
          <IconButton>
            <VerticalAlignBottomRoundedIcon
              sx={{
                fontSize: '22px',
                transform: 'rotate(-90deg)',
              }}
            ></VerticalAlignBottomRoundedIcon>
          </IconButton>

          <IconButton>
            <ExpandRoundedIcon
              sx={{
                fontSize: '22px',
                transform: 'rotate(90deg)',
              }}
            ></ExpandRoundedIcon>
          </IconButton>
        </div>
        <div className="rounded-full bg-surface-l1-light flex items-center">
          <IconButton>
            <ScatterPlotRoundedIcon
              sx={{ fontSize: '22px' }}
            ></ScatterPlotRoundedIcon>
          </IconButton>

          <IconButton>
            <ShowChartRoundedIcon
              sx={{ fontSize: '22px' }}
            ></ShowChartRoundedIcon>
          </IconButton>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" debounce={20}>
        <LineChart
          width={200}
          height={200}
          margin={{ top: 5, right: 5, left: 9, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props.XAxis.key} type="number">
            <Label value={props.XAxis.name} offset={0} position="bottom" />
          </XAxis>
          <YAxis dataKey={props.YAxis.key}>
            <Label
              value={props.YAxis.name}
              angle={-90}
              offset={0}
              position="left"
            />
          </YAxis>
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
