import { RemoteInfo } from 'dgram'
import Mdns from 'multicast-dns'
import { Socket } from 'node:net'

import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
import { sendDevicesMeasurementUpdate } from '@main/ipc/services/sendDevicesMeasurementUpdate'
import { KeyObjectState } from '@main/utils/KeyObjectState'
import { Device } from '@shared/types/Device'

import { handleMdnsResponse } from './handleMdnsResponse'

export class DevicesController {
  private devices: KeyObjectState<Device>
  private connections: {
    [deviceId: string]: { socket: Socket; buffer: string }
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
    const device = this.devices.get(id)

    if (!device) throw Error('Dispositivo não encontrado.')

    if (!this.connections[id]) {
      this.connections[id] = { socket: new Socket(), buffer: '' }
    }
    const connection = this.connections[id]

    const handleData = (data: Buffer) => {
      console.log(`<< ${id} | Data${data}`)
      connection.buffer += data.toString('utf-8')
      const messages = connection.buffer.split(/\n{1,2}/)
      connection.buffer = ''
      messages.forEach((message, index, array) => {
        if (index < array.length) {
          if (message) this.handleDeviceMessage(message, id)
        } else {
          connection.buffer = message
        }
      })
    }

    const connectionPromise = new Promise((resolve, reject) => {
      const socket = new Socket()
      socket.once('error', (error) => {
        reject(error)
      })
      socket.connect(
        {
          port: device.network.port,
          host: device.network.address,
        },
        () => {
          socket.removeAllListeners() // Para remover o error handler vinculado
          socket.setKeepAlive(true, 3000)
          socket.on('data', handleData)
          socket.on('close', () => {
            // TODO: Fazer tratamento de erro. Acredito que seria bom destruir o socket e removê-lo.
            this.devices.updateObject(id, { connected: false })
            console.log('closed')
          })
          socket.on('error', (error) => {
            console.log(error.message)
          })
          this.devices.updateObject(id, { connected: true })
          resolve(socket)
        },
      )
    })

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
