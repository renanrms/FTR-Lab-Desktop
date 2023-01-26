import { ipcMain } from 'electron'

import { CHANNELS } from '@shared/constants/channels'

ipcMain.handle(CHANNELS.DEVICES.INFO.REQUEST, async () => {
  console.log(CHANNELS.DEVICES.INFO.REQUEST)
})

ipcMain.handle(CHANNELS.DEVICES.CONNECTION.OPEN, async () => {
  console.log(CHANNELS.DEVICES.CONNECTION.OPEN)
  return {}
})

ipcMain.handle(CHANNELS.DEVICES.CONNECTION.CLOSE, async () => {
  console.log(CHANNELS.DEVICES.CONNECTION.CLOSE)
  return {}
})

ipcMain.handle(CHANNELS.DEVICES.UPDATE_SETTINGS, async () => {
  console.log(CHANNELS.DEVICES.UPDATE_SETTINGS)
  return {}
})
