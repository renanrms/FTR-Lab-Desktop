import { useEffect, useState } from 'react'

import { defaultDisplayedTimeRange } from '@renderer/features/chart/constants/defaultDisplayedTimeRange'
import { Measurement, MeasurementsBySensor } from '@shared/types/Measurement'

import { transformToRelativeTime } from '../utils/transformToRelativeTime'

export function useMeasurements() {
  const [sensorMeasurements, setSensorMeasurements] =
    useState<MeasurementsBySensor>({})

  useEffect(() => {
    window.api.measurements
      .findLastByDevice({ timeRange: defaultDisplayedTimeRange })
      .then(({ measurementsBySensor }) => {
        setSensorMeasurements(measurementsBySensor)
      })

    const removeListener = window.api.measurements.onUpdate(
      async (event, params) => {
        const receivedMeasurements: { [x: string]: Measurement[] } = {}

        params.measurements
          .map(transformToRelativeTime)
          .forEach((measurement) => {
            receivedMeasurements[measurement.sensorId] = receivedMeasurements[
              measurement.sensorId
            ]?.concat([measurement]) || [measurement]
          })

        setSensorMeasurements((state) => {
          const newState = { ...state }

          Object.entries(receivedMeasurements).forEach(
            ([sensorId, sensorMeasurements]) => {
              let newSensorState = newState[sensorId]
              newSensorState =
                newSensorState?.concat(sensorMeasurements) || sensorMeasurements
              newSensorState?.sort((a, b) => a.timestamp - b.timestamp)

              // Filtra para manter apenas as medições mais recentes
              const thresholdTimestamp = Math.floor(
                newSensorState.at(-1)!.timestamp - defaultDisplayedTimeRange,
              )
              const startIndex = newSensorState.findIndex(
                (measurement) => measurement.timestamp > thresholdTimestamp,
              )
              newSensorState = newSensorState.slice(startIndex)

              newState[sensorId] = newSensorState
            },
          )

          return newState
        })
      },
    )

    return removeListener
  }, [])

  const clearMeasurements = async () => {
    await window.api.measurements.deleteAll()
    setSensorMeasurements({})
  }

  return { sensorMeasurements, clearMeasurements }
}
