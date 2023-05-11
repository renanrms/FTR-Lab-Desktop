export interface DeviceMeasurement {
  sensorIndex: string
  timestamp: number
  value: any
}

export interface Measurement extends DeviceMeasurement {
  deviceId: string
  sensorId: string
}
