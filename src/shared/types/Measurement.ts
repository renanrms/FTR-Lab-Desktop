import { SensorId } from './Device'

export interface DeviceMeasurement {
  sensorIndex: string
  timestamp: number
  value: any
}

export interface Measurement {
  sensorId: string
  timestamp: number
  value: any
}

export type Boundaries = {
  min: number
  max: number
}

export type SensorBoundaries = Record<SensorId, Boundaries | undefined>

export type SensorMeasurements = Record<SensorId, Measurement[] | undefined>
