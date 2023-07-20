import { ipcMain } from 'electron'

import { DevicesController } from '@main/controllers/DevicesController'
import { MeasurementModel } from '@main/database/models'
import { CHANNELS } from '@shared/constants/channels'
import {
  CloseDeviceConnectionRequest,
  GetAllMeasurementsResponse,
  OpenDeviceConnectionRequest,
} from '@shared/types/ipc'

export function configureIpcHandlers(devicesController: DevicesController) {
  ipcMain.handle(CHANNELS.DEVICES.INFO.REQUEST, async () => {
    console.log(CHANNELS.DEVICES.INFO.REQUEST)
  })

  ipcMain.handle(
    CHANNELS.DEVICES.CONNECTION.OPEN,
    async (event, request: OpenDeviceConnectionRequest) => {
      console.log(
        `<= ${CHANNELS.DEVICES.CONNECTION.OPEN}\n${JSON.stringify(request)}`,
      )
      return {
        message: 'Conexão estabelecida',
        connection: await devicesController.openConnection(request.deviceId),
      }
    },
  )

  ipcMain.handle(
    CHANNELS.DEVICES.CONNECTION.CLOSE,
    async (event, request: CloseDeviceConnectionRequest) => {
      console.log(
        `<= ${CHANNELS.DEVICES.CONNECTION.CLOSE}\n${JSON.stringify(request)}`,
      )
      return {
        message: 'Conexão encerrada',
        connection: await devicesController.closeConnection(request.deviceId),
      }
    },
  )

  ipcMain.handle(
    CHANNELS.MEASUREMENTS.GET_ALL,
    async (event, request: void): Promise<GetAllMeasurementsResponse> => {
      console.log(
        `<= ${CHANNELS.MEASUREMENTS.GET_ALL}\n${JSON.stringify(request)}`,
      )
      const measurements = (await MeasurementModel.findAll()).map(
        (model) => model.dataValues,
      )

      return {
        measurements,
      }
    },
  )

  ipcMain.handle(CHANNELS.DEVICES.UPDATE_SETTINGS, async () => {
    console.log(CHANNELS.DEVICES.UPDATE_SETTINGS)
    return {}
  })
}
