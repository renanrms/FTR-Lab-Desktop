import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import net from 'node:net'
import path from 'node:path'

import { Device } from '@shared/types/Device'

import { createWindow } from './createWindow'
import { DevicesController } from './devices'
import { State } from './utils/State'

import './ipcHandlers/configure'

const devicesState = new State<Array<Device>>([])

const devicesController = new DevicesController(devicesState)

devicesController.startListener()

devicesController.startSearch()

if (process.platform === 'darwin') {
  app.dock.setIcon(path.resolve(__dirname, 'icon.png'))
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const client = new net.Socket()
  console.log('socket')
  client.connect({ port: 3333, host: '192.168.1.2' })
  client.on('data', (data) => {
    console.log(data.toString('utf-8'))
  })
  client.write('Hello, ESP32!!')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
