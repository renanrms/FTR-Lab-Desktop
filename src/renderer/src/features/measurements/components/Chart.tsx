import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded'
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded'
import { Button, IconButton } from '@mui/material'
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
import { twMerge } from 'tailwind-merge'

import { Sensor } from '@shared/types/Device'

import { useChartControls } from '../hooks/useChartControls'

interface ChartProps {
  className?: string
  XAxis: { key: string; name: string }
  YAxis: { key: string; name: string }
  data: Object[]
  sensor: Sensor
  timeRange: number
}

export function Chart(props: ChartProps) {
  const chartControls = useChartControls()

  return (
    <div
      className={twMerge(
        'p-4 pb-16 shadow border-2 border-secondary-90 dark:border-primary-30 bg-neutral-100 dark:bg-[#00000070] rounded-lg',
        props.className,
      )}
    >
      <div className="mb-2 ml-20 flex items-center">
        {/* <div className="rounded-full bg-neutral-98 dark:bg-neutral-20 border border-neutral-95 dark:border-neutral-30 flex items-center mr-4">
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
        </div> */}
        <div className="rounded-full bg-neutral-98 dark:bg-neutral-20 border border-neutral-95 dark:border-neutral-30 flex items-center mr-6">
          <IconButton onClick={chartControls.ShowFromOriginYHandleClick}>
            <VerticalAlignBottomRoundedIcon
              className={twMerge(
                'rotate-180',
                chartControls.ShowFromOriginY
                  ? 'text-primary-60 dark:text-primary-70'
                  : 'dark:text-neutral-80',
              )}
              color="inherit"
              sx={{ fontSize: '22px' }}
            />
          </IconButton>

          <IconButton onClick={chartControls.showExpandedYHandleClick}>
            <ExpandRoundedIcon
              className={twMerge(
                chartControls.showExpandedY
                  ? 'text-primary-60 dark:text-primary-70'
                  : 'dark:text-neutral-80',
              )}
              color="inherit"
              sx={{ fontSize: '22px' }}
            />
          </IconButton>
        </div>
        <div className="rounded-full bg-neutral-98 dark:bg-neutral-20 border border-neutral-95 dark:border-neutral-30 flex items-center mr-6">
          <IconButton onClick={chartControls.showPointsHandleClick}>
            <ScatterPlotRoundedIcon
              className={twMerge(
                chartControls.showPoints
                  ? 'text-primary-60 dark:text-primary-70'
                  : 'dark:text-neutral-80',
              )}
              color="inherit"
              sx={{ fontSize: '22px' }}
            />
          </IconButton>

          <IconButton onClick={chartControls.showLinesHandleClick}>
            <ShowChartRoundedIcon
              className={twMerge(
                chartControls.showLines
                  ? 'text-primary-60 dark:text-primary-70'
                  : 'dark:text-neutral-80',
              )}
              sx={{ fontSize: '22px' }}
            />
          </IconButton>
        </div>

        <Button
          variant="outlined"
          className="h-[40px] rounded-full capitalize border bg-neutral-98 dark:bg-neutral-20 border-neutral-95 hover:bg-neutral-95 dark:hover:bg-neutral-30 text-primary-60 dark:text-primary-70 dark:border-neutral-30"
          title="Exportar medidas"
          onClick={() => {
            window.api.measurements.export({
              sensorId: props.sensor.id,
              timeRange: props.timeRange,
            })
          }}
        >
          <DownloadOutlinedIcon sx={{ fontSize: '22px' }} />
          <span className="mx-2">Exportar</span>
        </Button>
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
          <YAxis
            dataKey={props.YAxis.key}
            domain={
              chartControls.showExpandedY
                ? ([dataMin, dataMax]) => {
                    return [dataMin, dataMax]
                  }
                : undefined
            }
          >
            <Label
              value={props.YAxis.name}
              angle={-90}
              offset={-5}
              position="insideBottomLeft"
            />
          </YAxis>
          <Tooltip
            labelClassName="text-neutral-20"
            labelFormatter={(label: number, payload) =>
              `t: ${label.toFixed(6)}`
            }
          />
          <Line
            type="monotone"
            dataKey={props.YAxis.key}
            data={props.data}
            name={props.YAxis.name}
            dot={chartControls.showPoints}
            strokeWidth={2}
            strokeDasharray={chartControls.showLines ? undefined : '0 5'}
            stroke="var(--md-ref-palette-primary50)"
            fill="var(--md-ref-palette-primary70)"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
