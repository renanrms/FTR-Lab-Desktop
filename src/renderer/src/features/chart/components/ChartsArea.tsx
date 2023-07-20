import { Device } from '@shared/types/Device'
import { SensorMeasurements } from '@shared/types/Measurement'

import { ChartContainer } from './ChartContainer'

interface ChartsAreaProps {
  devices: Device[]
  sensorMeasurements: SensorMeasurements
}

export function ChartsArea(props: ChartsAreaProps) {
  return (
    <main
      className="w-full px-4 pt-4 flex justify-evenly items-start flex-wrap overflow-y-auto overflow-hidden"
      style={{
        gridArea: 'main',
      }}
    >
      {props.devices
        .map((device) => device.sensors)
        .flat()
        .map(
          (sensor) =>
            props.sensorMeasurements[sensor.id] && (
              <ChartContainer
                sensor={sensor}
                measurements={props.sensorMeasurements[sensor.id]!}
                key={sensor.id}
              ></ChartContainer>
            ),
        )}
    </main>
  )
}
