import { Device } from './Device'
import { Measurement } from './Measurement'

// Comunicação partindo do processo Main

export interface DevicesInfoUpdateMessage {
  devices: Device[]
}

export interface MeasurementUpdateMessage {
  measurements: Measurement[]
  deviceId: string
}

// Comunicação partindo do processo Renderer

export interface OpenDeviceConnectionRequest {
  deviceId: string
}

export interface CloseDeviceConnectionRequest {
  deviceId: string
}

export interface GetAllMeasurementsResponse {
  measurements: Measurement[]
}

export interface UpdateDeviceSettingsRequest {
  deviceId: string
}
