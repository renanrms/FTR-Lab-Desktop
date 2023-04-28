import { RemoteInfo } from 'dgram'
import { BrowserWindow } from 'electron'
import Mdns from 'multicast-dns'
import { Socket } from 'node:net'

import { State } from '@main/utils/State'
import { CHANNELS } from '@shared/constants/channels'
import { Device } from '@shared/types/Device'

import { handleMdnsResponse } from './handleMdnsResponse'

export class DevicesController {
  private devicesState: State<Array<Device>>
  // private connections: [{deviceId: string, socket: Socket, buffer:}]
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

  async openConnection(id: string) {
    const device = this.devicesState.get().find((device) => device.id === id)
    const that = this

    if (!device) throw Error('Dispositivo não encontrado.')

    function handleData(this: { buffer: string }, data: Buffer): void {
      this.buffer = this.buffer || ''
      this.buffer += data.toString('utf-8')
      const messages = this.buffer.split(/\n{1,2}/)
      this.buffer = ''
      messages.forEach((message, index, array) => {
        if (index < array.length) {
          if (message) that.handleDeviceMessage(message, id)
        } else {
          this.buffer = message
        }
      })
      console.log(messages)
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
          socket.on('data', handleData)
          socket.on('error', (error) => {
            // TODO: Fazer tratamento de erro. Acredito que seria bom destruir o socket e removê-lo.
            console.log(error)
            throw error
          })
          device.connection.socket = socket
          console.log('connect')
          resolve(socket)
        },
      )
    })

    // TODO: Fazer um loop de tentativas de conexão porque muitas vezes não vai de primeira.
    const connection = await connectionPromise

    return connection

    // socket.connect({ port: device.network.port, host: device.network.address })
    // socket.on('data', handleData)
    // socket.on('connect', () => {
    //   device.connection.socket = socket
    //   console.log('connected')
    //   // console.log(socket)
    //   // socket.write('Hello, ESP32!!')
    // })
  }

  handleDeviceMessage(message: string, deviceId: string) {
    try {
      const json = JSON.parse(message)
      if (json.measurements) {
        const appMessage = {
          deviceId,
          measurements: json.measurements,
        }
        const mainWindow = BrowserWindow.getAllWindows()[0]
        if (mainWindow) {
          mainWindow.webContents.send(
            CHANNELS.DEVICES.MEASUREMENTS.UPDATE,
            appMessage,
          )
          console.log(`\nmessage sent:\n${appMessage}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
