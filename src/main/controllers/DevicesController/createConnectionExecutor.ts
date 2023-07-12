import { Socket } from 'node:net'

import { models } from '@main/database/db'
import { findAllDevices } from '@main/database/findAllDevices'
import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
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
  return async (resolve, reject) => {
    const device = await models.Device.findByPk(id, { include: 'sensors' })

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
          device.update({ connected: false }, { where: { id } })
          sendDevicesInfoUpdate({
            devices: await findAllDevices(),
          })
        })
        connection.socket.on('error', (error) => {
          console.log(
            `-- ${id} | Erro na conexão: ${error.message}\n(a conexão será encerrada)`,
          )
        })
        device.update({ connected: true }, { where: { id } })
        sendDevicesInfoUpdate({
          devices: await findAllDevices(),
        })
        resolve(connection.socket)
      },
    )
  }
}
