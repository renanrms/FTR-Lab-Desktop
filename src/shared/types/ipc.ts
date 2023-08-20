import { Device, SensorId } from './Device'
import { Measurement, MeasurementsBySensor } from './Measurement'

// Comunicação partindo do processo Main

export interface GetAllDevicesResponse {
  devices: Device[]
}

export interface DevicesInfoUpdateMessage {
  devices: Device[]
}

export interface MeasurementUpdateMessage {
  measurements: Measurement[]
  deviceId: string
}

// Comunicação partindo do processo Renderer

export interface GetAppStartTimeResponse {
  appStartTime: number
}

export interface OpenDeviceConnectionRequest {
  deviceId: string
}

export interface CloseDeviceConnectionRequest {
  deviceId: string
}

export interface GetAllMeasurementsResponse {
  measurements: Measurement[]
}

export interface FindAllMeasurementsByDeviceResponse {
  measurementsBySensor: MeasurementsBySensor
}
export interface FindAllMeasurementsByDeviceRequest {
  timeRange: number
}

export interface UpdateDeviceSettingsRequest {
  deviceId: string
}

export interface ExportMeasurementsRequest {
  sensorId: SensorId
}
