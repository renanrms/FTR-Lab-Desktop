import { appInfo } from '@renderer/features/appInfo/constants/appInfo'
import { Measurement } from '@shared/types/Measurement'

/**
 * Transforma uma medição para tempo relativo ao início do app.
 *
 * Deve ser usada apenas no processo renderer.
 */
export function transformToRelativeTime(measurement: Measurement) {
  return {
    ...measurement,
    timestamp: measurement.timestamp - appInfo.startTime,
  }
}
