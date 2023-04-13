import { IpcRendererEvent, ipcRenderer } from 'electron'

import { CHANNELS } from '@shared/constants/channels'
import {
  CloseDeviceConnectionRequest,
  DevicesUpdateData,
  OpenDeviceConnectionRequest,
  UpdateDeviceSettingsRequest,
} from '@shared/types/ipc'

// Custom APIs for renderer
export const api = {
  devices: {
    onUpdate(
      callback: (event: IpcRendererEvent, params: DevicesUpdateData) => void,
    ) {
      ipcRenderer.on(CHANNELS.DEVICES.INFO.UPDATE, callback)

      return () => {
        ipcRenderer.removeListener(CHANNELS.DEVICES.INFO.UPDATE, callback)
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
}
