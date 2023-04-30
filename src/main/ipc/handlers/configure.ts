import { ipcMain } from 'electron'

import { DevicesController } from '@main/devices'
import { CHANNELS } from '@shared/constants/channels'
import { OpenDeviceConnectionRequest } from '@shared/types/ipc'

export function configureIpcHandlers(devicesController: DevicesController) {
  ipcMain.handle(CHANNELS.DEVICES.INFO.REQUEST, async () => {
    console.log(CHANNELS.DEVICES.INFO.REQUEST)
  })

  ipcMain.handle(
    CHANNELS.DEVICES.CONNECTION.OPEN,
    async (event, request: OpenDeviceConnectionRequest) => {
      console.log(CHANNELS.DEVICES.CONNECTION.OPEN)
      return {
        message: 'Conexão estabelecida',
        connection: await devicesController.openConnection(request.deviceId),
      }
    },
  )

  ipcMain.handle(CHANNELS.DEVICES.CONNECTION.CLOSE, async () => {
    console.log(CHANNELS.DEVICES.CONNECTION.CLOSE)
    return {}
  })

  ipcMain.handle(CHANNELS.DEVICES.UPDATE_SETTINGS, async () => {
    console.log(CHANNELS.DEVICES.UPDATE_SETTINGS)
    return {}
  })
}
