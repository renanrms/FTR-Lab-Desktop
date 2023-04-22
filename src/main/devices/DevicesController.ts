import { RemoteInfo } from 'dgram'
import Mdns from 'multicast-dns'

import { State } from '@main/utils/State'
import { Device } from '@shared/types/Device'

import { handleMdnsResponse } from './handleMdnsResponse'

export class DevicesController {
  private devicesState: State<Array<Device>>
  private mdns

  constructor(devicesState: State<Array<Device>>) {
    this.devicesState = devicesState
    this.mdns = Mdns()
  }

  /*
    TODO: corrigir a parte de busca do dispositivo no desktop e/ou no embarcado para que responda mensagens.
    Este trecho está como faz sentido pra mim, mas o dispositivo nunca responde,
    apenas envia respostas de forma força forçada, independente da query.
  */
  startSearch(interval: number = 30) {
    setInterval(() => {
      this.mdns.query({
        questions: [
          {
            name: '_ftr-lab._tcp.local',
            type: 'ANY',
          },
        ],
      } as any)
    }, interval * 1000)
  }

  startListener() {
    this.mdns.on(
      'response',
      (response: Mdns.ResponsePacket, rinfo: RemoteInfo) => {
        handleMdnsResponse(response, rinfo, this.devicesState)
      },
    )
  }
}
