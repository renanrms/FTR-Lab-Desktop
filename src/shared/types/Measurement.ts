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

export type MeasurementsBySensor = Record<SensorId, Measurement[] | undefined>
