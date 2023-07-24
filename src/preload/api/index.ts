import { IpcRendererEvent, ipcRenderer } from 'electron'

import { CHANNELS } from '@shared/constants/channels'
import {
  CloseDeviceConnectionRequest,
  DevicesInfoUpdateMessage,
  ExportMeasurementsRequest,
  GetAllMeasurementsResponse,
  GetAppStartTimeResponse,
  MeasurementUpdateMessage,
  OpenDeviceConnectionRequest,
  UpdateDeviceSettingsRequest,
} from '@shared/types/ipc'

// Custom APIs for renderer
export const api = {
  app: {
    getStartTime(): Promise<GetAppStartTimeResponse> {
      return ipcRenderer.invoke(CHANNELS.APP.GET_START_TIME)
    },
  },
  devices: {
    onDevicesInfoUpdate(
      callback: (
        event: IpcRendererEvent,
        params: DevicesInfoUpdateMessage,
      ) => void,
    ) {
      ipcRenderer.on(CHANNELS.DEVICES.INFO.UPDATE, callback)

      return () => {
        ipcRenderer.removeListener(CHANNELS.DEVICES.INFO.UPDATE, callback)
      }
    },

    openConnection(request: OpenDeviceConnectionRequest) {
      return ipcRenderer.invoke(CHANNELS.DEVICES.CONNECTION.OPEN, request)
    },

    closeConnection(request: CloseDeviceConnectionRequest) {
      return ipcRenderer.invoke(CHANNELS.DEVICES.CONNECTION.CLOSE, request)
    },

    updateSettings(request: UpdateDeviceSettingsRequest) {
      return ipcRenderer.invoke(CHANNELS.DEVICES.UPDATE_SETTINGS, request)
    },
  },
  measurements: {
    async getAll(request: void): Promise<GetAllMeasurementsResponse> {
      return await ipcRenderer.invoke(CHANNELS.MEASUREMENTS.GET_ALL, request)
    },

    async deleteAll(request: void): Promise<void> {
      return await ipcRenderer.invoke(CHANNELS.MEASUREMENTS.DELETE_ALL, request)
    },

    async export(request: ExportMeasurementsRequest): Promise<void> {
      return await ipcRenderer.invoke(CHANNELS.MEASUREMENTS.EXPORT, request)
    },

    onUpdate(
      callback: (
        event: IpcRendererEvent,
        params: MeasurementUpdateMessage,
      ) => void,
    ) {
      ipcRenderer.on(CHANNELS.MEASUREMENTS.UPDATE, callback)

      return () => {
        ipcRenderer.removeListener(CHANNELS.MEASUREMENTS.UPDATE, callback)
      }
    },
  },
}
