import { startUpTime } from '@renderer/constants/startUpTime'
import { Measurement } from '@shared/types/Measurement'

export function transformToRelativeTime(measurement: Measurement) {
  return {
    ...measurement,
    timestamp: measurement.timestamp - startUpTime,
  }
}
