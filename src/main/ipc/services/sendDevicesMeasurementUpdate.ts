import { CHANNELS } from '@shared/constants/channels'
import { DevicesMeasurementUpdateMessage } from '@shared/types/ipc'

import { sendIpcMessage } from '../sendIpcMessage'

export function sendDevicesMeasurementUpdate(
  message: DevicesMeasurementUpdateMessage,
) {
  sendIpcMessage(CHANNELS.DEVICES.MEASUREMENTS.UPDATE, message)
}
