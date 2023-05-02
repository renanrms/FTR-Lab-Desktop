import { RemoteInfo } from 'dgram'
import Mdns from 'multicast-dns'

import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
import { sendDevicesMeasurementUpdate } from '@main/ipc/services/sendDevicesMeasurementUpdate'
import { KeyObjectState } from '@main/utils/KeyObjectState'
import { ConnectionData } from '@shared/types/ConnectionData'
import { Device } from '@shared/types/Device'

import { createConnectionExecutor } from './createConnectionExecutor'
import { handleMdnsResponse } from './handleMdnsResponse'
export class DevicesController {
  private devices: KeyObjectState<Device>
  private connections: {
    [deviceId: string]: ConnectionData
  }

  private mdns

  constructor() {
    this.devices = new KeyObjectState<Device>({
      onChange: (devices) => {
        sendDevicesInfoUpdate({ devices })
      },
    })
    this.connections = {}
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
        handleMdnsResponse(response, rinfo, this.devices)
      },
    )
  }

  async openConnection(id: string) {
    const connectionPromise = new Promise(
      createConnectionExecutor(
        this.devices,
        this.connections,
        id,
        this.handleDeviceMessage,
      ),
    )

    // TODO: Fazer um loop de tentativas de conexão porque muitas vezes não vai de primeira.
    await connectionPromise

    // return connection
  }

  handleDeviceMessage(message: string, deviceId: string) {
    try {
      const json = JSON.parse(message)
      if (json.measurements) {
        sendDevicesMeasurementUpdate({
          deviceId,
          measurements: json.measurements,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
