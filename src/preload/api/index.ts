import { IpcRendererEvent, ipcRenderer } from 'electron'

import { CHANNELS } from '@shared/constants/channels'
import {
  CloseDeviceConnectionRequest,
  DevicesInfoUpdateMessage,
  GetAllMeasurementsResponse,
  MeasurementUpdateMessage,
  OpenDeviceConnectionRequest,
  UpdateDeviceSettingsRequest,
} from '@shared/types/ipc'

// Custom APIs for renderer
export const api = {
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
    onMeasurementsUpdate(
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
    requestInfo() {
      ipcRenderer.invoke(CHANNELS.DEVICES.INFO.REQUEST)
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
    async getAllMeasurements(
      request: void,
    ): Promise<GetAllMeasurementsResponse> {
      return await ipcRenderer.invoke(CHANNELS.MEASUREMENTS.GET_ALL, request)
    },
  },
}
