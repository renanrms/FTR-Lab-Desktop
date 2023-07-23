import { format } from 'date-fns'
import { dialog, ipcMain, app } from 'electron'
import fs from 'fs'
import path from 'path'

import { DevicesController } from '@main/controllers/DevicesController'
import { MeasurementModel, SensorModel } from '@main/database/models'
import { getMainWindow } from '@main/utils/getMainWindow'
import { CHANNELS } from '@shared/constants/channels'
import { Sensor } from '@shared/types/Device'
import {
  CloseDeviceConnectionRequest,
  ExportMeasurementsRequest,
  GetAllMeasurementsResponse,
  OpenDeviceConnectionRequest,
} from '@shared/types/ipc'
import { Measurement } from '@shared/types/Measurement'

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
      console.log(`<= ${CHANNELS.MEASUREMENTS.GET_ALL}`)
      const measurements = (await MeasurementModel.findAll()).map(
        (model) => model.dataValues,
      )
      return {
        measurements,
      }
    },
  )

  ipcMain.handle(
    CHANNELS.MEASUREMENTS.DELETE_ALL,
    async (event, request: void): Promise<void> => {
      console.log(`<= ${CHANNELS.MEASUREMENTS.DELETE_ALL}`)
      await MeasurementModel.truncate()
    },
  )

  ipcMain.handle(CHANNELS.DEVICES.UPDATE_SETTINGS, async () => {
    console.log(CHANNELS.DEVICES.UPDATE_SETTINGS)
    return {}
  })

  ipcMain.handle(
    CHANNELS.MEASUREMENTS.EXPORT,
    async (event, request: ExportMeasurementsRequest): Promise<void> => {
      console.log(
        `<= ${CHANNELS.MEASUREMENTS.EXPORT}\n${JSON.stringify(request)}`,
      )

      const sensor: Sensor = (await SensorModel.findByPk(request.sensorId))
        ?.dataValues

      const measurements: Measurement[] = (
        await MeasurementModel.findAll({
          where: {
            sensorId: request.sensorId,
          },
        })
      ).map((model) => model.dataValues)

      const fileHeader = `t, ${sensor.quantity}`

      const fileBody = measurements
        .map((measurement) => `${measurement.timestamp}, ${measurement.value}`)
        .join('\n')

      const fileContent = [fileHeader, fileBody].join('\n')

      dialog
        .showSaveDialog(getMainWindow(), {
          title: 'Exportar medições',
          defaultPath: path.join(
            app.getPath('documents'),
            `${format(new Date(), 'yyyyMMdd_HHmmss')}_${sensor.quantity}.csv`,
          ),

          filters: [
            { name: 'Arquivos CSV', extensions: ['csv'] },
            { name: 'Todos os Arquivos', extensions: ['*'] },
          ],
        })
        .then((result) => {
          if (!result.canceled && result.filePath) {
            fs.writeFile(result.filePath, fileContent, (err) => {
              if (err) {
                console.error('Erro ao salvar o arquivo:', err)
              } else {
                console.log('Arquivo salvo com sucesso!')
              }
            })
          }
        })
        .catch((err) => {
          console.error('Erro ao exibir a caixa de diálogo:', err)
        })
    },
  )
}
