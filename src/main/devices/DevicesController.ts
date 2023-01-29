import Mdns from 'multicast-dns'

import { DeviceInfo } from '@shared/types/ipc'
import { State } from '../utils/State'
import { handleMdnsResponse } from './handleMdnsResponse'

export class DevicesController {
  private devicesState: State<Array<DeviceInfo>>
  private mdns

  constructor(devicesState: State<Array<DeviceInfo>>) {
    this.devicesState = devicesState
    this.mdns = Mdns()
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
    this.mdns.on('response', (response: Mdns.ResponsePacket) => {
      console.log(response)
      handleMdnsResponse(response, this.devicesState)
    })
  }
}
