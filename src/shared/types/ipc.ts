export interface DeviceInfo {
  id: string
  name: string
  capabilities: Array<string>
  network: {
    MACAddress: string
  }
}

export interface DevicesUpdateData {
  devices: Array<DeviceInfo>
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
