import { Socket } from 'node:net'

import { KeyObjectState } from '@main/utils/KeyObjectState'
import { ConnectionData } from '@shared/types/ConnectionData'
import { Device } from '@shared/types/Device'

import { createHandleData } from './createHandleData'

type PromiseExecutor = (
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => void

export function createConnectionExecutor(
  devices: KeyObjectState<Device>,
  connections: {
    [deviceId: string]: ConnectionData
  },
  id: string,
  handleDeviceMessage: (message: string, id: string) => void,
): PromiseExecutor {
  return (resolve, reject) => {
    const device = devices.get(id)

    if (!device) {
      throw Error('Dispositivo não encontrado.')
    }

    connections[id] = { socket: new Socket(), buffer: '' }
    const connection = connections[id]

    connection.socket.once('error', (error) => {
      reject(error)
    })
    connection.socket.connect(
      {
        port: device.network.port,
        host: device.network.address,
      },
      () => {
        connection.socket.removeAllListeners() // Para remover o error handler vinculado
        connection.socket.setKeepAlive(true, 3000)
        connection.socket.on(
          'data',
          createHandleData(id, connection, handleDeviceMessage),
        )
        connection.socket.on('close', () => {
          devices.updateObject(id, { connected: false })
        })
        connection.socket.on('error', (error) => {
          console.log(error.message)
        })
        devices.updateObject(id, { connected: true })
        resolve(connection.socket)
      },
    )
  }
}
