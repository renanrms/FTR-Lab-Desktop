import { CHANNELS } from '@shared/constants/channels'
import { MeasurementUpdateMessage } from '@shared/types/ipc'

import { sendIpcMessage } from '../sendIpcMessage'

export function sendMeasurementUpdate(message: MeasurementUpdateMessage) {
  sendIpcMessage(CHANNELS.MEASUREMENTS.UPDATE, message)
}
