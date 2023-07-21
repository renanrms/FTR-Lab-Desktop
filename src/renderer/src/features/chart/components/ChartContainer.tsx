import { Sensor } from '@shared/types/Device'
import { Measurement } from '@shared/types/Measurement'

import { Chart } from './Chart'

interface ChartContainerProps {
  sensor: Sensor
  measurements: Measurement[]
}

export function ChartContainer(props: ChartContainerProps) {
  // Obter o sensor

  const serie = {
    XAxis: { key: 'timestamp', name: 'Tempo' },
    YAxis: { key: 'value', name: props.sensor.quantity },
    data: props.measurements,
  }

  return (
    <Chart
      className="w-full h-[350px] m-2 min-[1450px]:w-[48%] min-[1450px]:h-[400px]"
      XAxis={serie.XAxis}
      YAxis={serie.YAxis}
      data={serie.data}
      sensor={props.sensor}
    ></Chart>
  )
}
