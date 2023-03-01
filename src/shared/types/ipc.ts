import { Device } from './Device'

export interface DevicesUpdateData {
  devices: Array<Device>
}

export interface OpenDeviceConnectionRequest {
  deviceId: string
}

export interface CloseDeviceConnectionRequest {
  deviceId: string
}

export interface UpdateDeviceSettingsRequest {
  deviceId: string
}
