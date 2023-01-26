import { ipcRenderer } from 'electron'

import { CHANNELS } from '@shared/constants/channels'
import {
  CloseDeviceConnectionRequest,
  OpenDeviceConnectionRequest,
  UpdateDeviceSettingsRequest,
} from '@shared/types/ipc'

// Custom APIs for renderer
export const api = {
  devices: {
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
