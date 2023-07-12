import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import path from 'node:path'

import { DevicesController } from './controllers/DevicesController'
import { createWindow } from './createWindow'
import { findAllDevices } from './database/queries/findAllDevices'
import { resetAllDevicesStates } from './database/resetAllDevicesStates'
import { syncDatabase } from './database/syncDatabase'
import { configureIpcHandlers } from './ipc/handlers/configure'
import { sendDevicesInfoUpdate } from './ipc/services/sendDevicesInfoUpdate'

const devicesController = new DevicesController()

// TODO: Habilitar top-level await pra usar await com a função syncDatabase.
syncDatabase()
  .then(resetAllDevicesStates)
  .then(() => {
    devicesController.startListener()
    devicesController.startSearch()
    configureIpcHandlers(devicesController)
  })

if (process.platform === 'darwin') {
  app.dock.setIcon(path.resolve(__dirname, 'icon.png'))
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  setTimeout(async () => {
    sendDevicesInfoUpdate({
      devices: await findAllDevices(),
    })
  }, 2000)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
