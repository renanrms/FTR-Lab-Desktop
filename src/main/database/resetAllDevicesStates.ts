import { DeviceModel } from './models'

export async function resetAllDevicesStates() {
  DeviceModel.findAll().then((devices) => {
    devices.forEach((device) => {
      device.update({ connected: false, available: false })
    })
  })
}
