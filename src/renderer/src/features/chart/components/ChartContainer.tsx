import { useState } from 'react'

import { Sensor } from '@shared/types/Device'
import { Boundaries } from '@shared/types/Measurement'

import { useSensorMeasurements } from '../hooks/useSensorMeasurements'
import { Chart } from './Chart'

interface ChartContainerProps {
  sensor: Sensor
  storedRange: Boundaries
}

export function ChartContainer(props: ChartContainerProps) {
  const [targetRange, setTargetRange] = useState<Boundaries>({
    min: -Infinity,
    max: Infinity,
  })
  const { loadedMeasurements } = useSensorMeasurements(
    props.sensor.id,
    targetRange,
    props.storedRange,
  )

  const serie = {
    XAxis: { key: 'timestamp', name: 'Tempo' },
    YAxis: { key: 'value', name: props.sensor.quantity },
    data: loadedMeasurements,
  }

  return (
    <Chart
      className="w-full h-[350px] m-2 min-[1450px]:w-[48%] min-[1450px]:h-[400px]"
      XAxis={serie.XAxis}
      YAxis={serie.YAxis}
      data={serie.data}
      setTargetRange={setTargetRange}
      storedRange={props.storedRange}
    ></Chart>
  )
}
