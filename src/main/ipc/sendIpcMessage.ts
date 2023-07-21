import { getMainWindow } from '@main/utils/getMainWindow'

export function sendIpcMessage(channel: string, message: any) {
  const mainWindow = getMainWindow()

  if (mainWindow) {
    mainWindow.webContents.send(channel, message)
    console.log(`=> ${channel}\n${JSON.stringify(message)}`)
  }
}
