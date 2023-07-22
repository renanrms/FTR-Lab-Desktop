import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded'
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import IconButton from '@mui/material/IconButton'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Sensor } from '@shared/types/Device'

interface ChartProps {
  className?: string
  XAxis: { key: string; name: string }
  YAxis: { key: string; name: string }
  data: Object[]
  sensor: Sensor
}

export function Chart(props: ChartProps) {
  return (
    <div
      className={[
        'p-4 pb-16 shadow border-2 border-secondary-90 dark:border-primary-50 bg-neutral-100 rounded-lg',
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
            />
          </IconButton>

          <IconButton>
            <ExpandRoundedIcon
              sx={{
                fontSize: '22px',
                transform: 'rotate(90deg)',
              }}
            />
          </IconButton>
        </div>
        <div className="rounded-full bg-surface-l1-light flex items-center mr-4">
          <IconButton>
            <ScatterPlotRoundedIcon sx={{ fontSize: '22px' }} />
          </IconButton>

          <IconButton>
            <ShowChartRoundedIcon sx={{ fontSize: '22px' }} />
          </IconButton>
        </div>
        <div className="rounded-full bg-surface-l1-light flex items-center">
          <IconButton
            onClick={() => {
              window.api.measurements.export({
                sensorId: props.sensor.id,
              })
            }}
          >
            <DownloadOutlinedIcon sx={{ fontSize: '22px' }} />
          </IconButton>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" debounce={20}>
        <LineChart
          width={200}
          height={200}
          margin={{ top: 5, right: 5, left: 18, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={props.XAxis.key}
            type="number"
            tickCount={10}
            domain={([dataMin, dataMax]) => {
              const absMin = Math.floor(dataMin)
              const absMax = Math.ceil(dataMax)
              return [absMin, absMax]
            }}
          >
            <Label value={props.XAxis.name} offset={0} position="bottom" />
          </XAxis>
          <YAxis dataKey={props.YAxis.key}>
            <Label
              value={props.YAxis.name}
              angle={-90}
              offset={-5}
              position="insideBottomLeft"
            />
          </YAxis>
          <Tooltip
            labelFormatter={(label: number, payload) =>
              `t: ${label.toFixed(6)}`
            }
          />
          <Line
            type="monotone"
            dataKey={props.YAxis.key}
            data={props.data}
            name={props.YAxis.name}
            stroke="var(--md-ref-palette-primary50)"
            fill="var(--md-ref-palette-primary70)"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
