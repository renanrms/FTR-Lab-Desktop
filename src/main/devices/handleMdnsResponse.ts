import { BrowserWindow } from 'electron'
import Mdns from 'multicast-dns'

import { CHANNELS } from '@shared/constants/channels'
import { DeviceInfo } from '@shared/types/ipc'
import { State } from '../utils/State'

export function handleMdnsResponse(
  response: Mdns.ResponsePacket,
  devicesState: State<Array<DeviceInfo>>,
) {
  const devices = [
    ...devicesState.get(),
    {
      id: 'ff-ff-ff-ff-ff-ff',
      name: 'Mecânica',
      capabilities: ['Photogate', 'Distância'],
      network: {
        MACAddress: 'ff-ff-ff-ff-ff-ff',
      },
    },
  ]

  devicesState.set(devices)

  const mainWindow = BrowserWindow.getAllWindows()[0]
  if (mainWindow) {
    mainWindow.webContents.send(CHANNELS.DEVICES.INFO.UPDATE, { devices })
  }
}
