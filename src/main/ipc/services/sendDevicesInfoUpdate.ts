import { CHANNELS } from '@shared/constants/channels'
import { DevicesInfoUpdateMessage } from '@shared/types/ipc'

import { sendIpcMessage } from '../sendIpcMessage'

export function sendDevicesInfoUpdate(message: DevicesInfoUpdateMessage) {
  sendIpcMessage(CHANNELS.DEVICES.INFO.UPDATE, message)
}
