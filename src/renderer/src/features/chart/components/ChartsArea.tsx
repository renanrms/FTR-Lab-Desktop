import { Device } from '@shared/types/Device'
import { SensorBoundaries } from '@shared/types/Measurement'

import { ChartContainer } from './ChartContainer'

interface ChartsAreaProps {
  devices: Device[]
  storedRanges: SensorBoundaries
}

export function ChartsArea(props: ChartsAreaProps) {
  return (
    <main
      className="w-full px-4 pt-4 flex justify-evenly items-start flex-wrap overflow-y-auto overflow-hidden"
      style={{
        gridArea: 'main',
      }}
    >
      {Object.entries(props.storedRanges).map(
        ([sensorId, sensorBoundaries], index) => {
          if (!sensorBoundaries) return undefined
          const deviceId = sensorId.split(':')[0]
          const device = props.devices.find((device) => device.id === deviceId)
          if (!device || !device.connected) return undefined
          const sensor = device.sensors.find((s) => s.id === sensorId)
          if (!sensor) return undefined

          return (
            <ChartContainer
              sensor={sensor}
              storedRange={sensorBoundaries}
              key={index}
            ></ChartContainer>
          )
        },
      )}
    </main>
  )
}
