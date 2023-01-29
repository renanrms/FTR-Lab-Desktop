import { BrowserWindow } from 'electron'
import makeMdns from 'multicast-dns'

import { CHANNELS } from '@shared/constants/channels'
import { DeviceInfo } from '@shared/types/ipc'
import { State } from '../utils/State'

export class DevicesController {
  private devicesState: State<Array<DeviceInfo>>
  private mdns

  constructor(devicesState: State<Array<DeviceInfo>>) {
    this.devicesState = devicesState
    this.mdns = makeMdns()
  }

  search() {
    this.mdns.query({
      questions: [
        {
          // name: 'ftr-lab.local',
          name: 'local',
          type: 'A',
        },
        {
          // name: 'ftr-lab.local',
          name: 'local',
          type: 'AAAA',
        },
      ],
    })
  }

  startListener() {
    this.mdns.on('response', (response: any) => {
      console.log(response)

      const devices = [
        ...this.devicesState.get(),
        {
          id: 'ff-ff-ff-ff-ff-ff',
          name: 'Mecânica',
          capabilities: ['Photogate', 'Distância'],
          network: {
            MACAddress: 'ff-ff-ff-ff-ff-ff',
          },
        },
      ]

      this.devicesState.set(devices)

      const mainWindow = BrowserWindow.getAllWindows()[0]
      if (mainWindow) {
        mainWindow.webContents.send(CHANNELS.DEVICES.INFO.UPDATE, { devices })
      }
    })
  }
}
