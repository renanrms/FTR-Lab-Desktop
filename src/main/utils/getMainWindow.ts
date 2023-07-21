import { BrowserWindow } from 'electron'

export function getMainWindow() {
  return BrowserWindow.getAllWindows()[0]
}
