import { SensorId } from './Device'

export interface DeviceMeasurement {
  sensorIndex: string
  timestamp: number
  value: any
}

export interface Measurement extends DeviceMeasurement {
  deviceId: string
  sensorId: string
}

export type Boundaries = {
  min: number
  max: number
}

export type SensorBoundaries = Record<SensorId, Boundaries | undefined>
