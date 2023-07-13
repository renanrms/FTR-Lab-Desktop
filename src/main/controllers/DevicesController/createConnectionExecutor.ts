import { Socket } from 'node:net'

import { DeviceModel } from '@main/database/models'
import { findAllDevices } from '@main/database/queries/findAllDevices'
import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
import { ConnectionData } from '@shared/types/ConnectionData'

import { createHandleData } from './createHandleData'

type PromiseExecutor = (
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => void

export function createConnectionExecutor(
  connections: {
    [deviceId: string]: ConnectionData
  },
  id: string,
  handleDeviceMessage: (message: string, id: string) => void,
): PromiseExecutor {
  return async (resolve, reject) => {
    const device = await DeviceModel.findByPk(id, { include: 'sensors' })

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
        port: device.dataValues.network.port,
        host: device.dataValues.network.address,
      },
      async () => {
        connection.socket.removeAllListeners() // Para remover o error handler vinculado
        connection.socket.setKeepAlive(true, 3000)
        connection.socket.on(
          'data',
          createHandleData(id, connection, handleDeviceMessage),
        )
        connection.socket.on('close', async () => {
          device.update({ connected: false })
          sendDevicesInfoUpdate({
            devices: await findAllDevices(),
          })
        })
        connection.socket.on('error', (error) => {
          console.log(
            `-- ${id} | Erro na conexão: ${error.message}\n(a conexão será encerrada)`,
          )
        })
        device.update({ connected: true })
        sendDevicesInfoUpdate({
          devices: await findAllDevices(),
        })
        resolve(connection.socket)
      },
    )
  }
}
