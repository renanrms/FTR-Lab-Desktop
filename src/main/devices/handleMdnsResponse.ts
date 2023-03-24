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
  console.log(rinfo)

  const srvAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'SRV',
  )

  if (!srvAnswer) return undefined

  const matchingDevice: Device = {
    id: srvAnswer.name.split('._ftr-lab._tcp.local')[0],
    network: {
      address: rinfo.address,
      family: rinfo.family,
    },
    updatedAt: new Date(),
  }

  let devices = devicesState.get()

  if (devices.some((device) => device.id === matchingDevice.id)) {
    devices = devices.map((device) => {
      if (device.id === matchingDevice.id) {
        return {
          ...device,
          ...matchingDevice,
        }
      } else {
        return device
      }
    })
  } else {
    devices.push(matchingDevice)
  }

  devicesState.set(devices)

  const mainWindow = BrowserWindow.getAllWindows()[0]
  if (mainWindow) {
    mainWindow.webContents.send(CHANNELS.DEVICES.INFO.UPDATE, {
      devices: devicesState.get(),
    })
  }
}
