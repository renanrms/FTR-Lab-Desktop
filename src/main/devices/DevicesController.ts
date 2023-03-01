import Mdns from 'multicast-dns'
import { RemoteInfo } from 'dgram'

import { Device } from '@shared/types/Device'
import { State } from '../utils/State'
import { handleMdnsResponse } from './handleMdnsResponse'

export class DevicesController {
  private devicesState: State<Array<Device>>
  private mdns

  constructor(devicesState: State<Array<Device>>) {
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
    this.mdns.on(
      'response',
      (response: Mdns.ResponsePacket, rinfo: RemoteInfo) => {
        console.log(response)
        console.log(rinfo)
        handleMdnsResponse(response, rinfo, this.devicesState)
      },
    )
  }
}
