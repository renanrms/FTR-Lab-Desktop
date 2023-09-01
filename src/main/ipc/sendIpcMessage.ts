import { getMainWindow } from '@main/utils/getMainWindow'

export function sendIpcMessage(
  channel: string,
  message: any,
  log: boolean | string = true,
) {
  const mainWindow = getMainWindow()

  if (mainWindow) {
    mainWindow.webContents.send(channel, message)
    if (log)
      console.log(
        `=> ${channel}\n${
          typeof log === 'string' ? log : JSON.stringify(message)
        }`,
      )
  }
}
