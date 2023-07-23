import { appStartTime } from '@renderer/constants/appStartTime'
import { Measurement } from '@shared/types/Measurement'

export function transformToRelativeTime(measurement: Measurement) {
  return {
    ...measurement,
    timestamp: measurement.timestamp - appStartTime,
  }
}
