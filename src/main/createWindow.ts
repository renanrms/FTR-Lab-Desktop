import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import path from 'node:path'

export function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 670,
    minWidth: 613,
    minHeight: 393,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#FBFDF9',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 20,
      y: 20,
    },
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png'),
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}
