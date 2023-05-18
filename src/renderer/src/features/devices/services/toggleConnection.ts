import { Device } from '@shared/types/Device'

export async function toggleConnection(device: Device) {
  if (!device.connected) {
    await window.api.devices.openConnection({ deviceId: device.id })
  } else {
    await window.api.devices.closeConnection({ deviceId: device.id })
  }
}
