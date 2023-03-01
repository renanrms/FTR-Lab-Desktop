import { BrowserWindow } from 'electron'
import Mdns from 'multicast-dns'
import { RemoteInfo } from 'dgram'

import { CHANNELS } from '@shared/constants/channels'
import { Device } from '@shared/types/Device'
import { State } from '../utils/State'

export function handleMdnsResponse(
  response: Mdns.ResponsePacket,
  rinfo: RemoteInfo,
  devicesState: State<Array<Device>>,
) {
  console.log(response.answers)

  const matchingDevices = response.answers
    .filter((answer) => !!answer.name.match(/^.*\.ftr-lab.local$/))
    .map((answer) => {
      const device: Device = {
        id: answer.name.split('.ftr-lab.local')[0],
        network: {
          address: rinfo.address,
          family: rinfo.family,
        },
        updatedAt: new Date(),
      }
      return device
    })

  const currentDevices = devicesState.get()
  const currentDevicesUpdated = currentDevices.map((device) => {
    const newDeviceData = matchingDevices.find(
      (matchingDevice) => matchingDevice.id === device.id,
    )
    return {
      ...device,
      ...newDeviceData,
    }
  })
  const newMatchingDevices = matchingDevices.filter((matchingDevice) =>
    currentDevices.every(
      (currentDevice) => currentDevice.id !== matchingDevice.id,
    ),
  )

  const devices = [...currentDevicesUpdated, ...newMatchingDevices]

  devicesState.set(devices)

  const mainWindow = BrowserWindow.getAllWindows()[0]
  if (mainWindow) {
    mainWindow.webContents.send(CHANNELS.DEVICES.INFO.UPDATE, { devices })
  }
}
