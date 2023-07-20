import { useEffect, useState } from 'react'

import { Measurement, SensorMeasurements } from '@shared/types/Measurement'

import { transformToRelativeTime } from '../utils/transformToRelativeTime'

export function useMeasurements() {
  const [sensorMeasurements, setSensorMeasurements] =
    useState<SensorMeasurements>({})

  useEffect(() => {
    window.api.measurements.getAll().then(async ({ measurements }) => {
      const receivedMeasurements: { [x: string]: Measurement[] } = {}

      measurements.map(transformToRelativeTime).forEach((measurement) => {
        receivedMeasurements[measurement.sensorId] = receivedMeasurements[
          measurement.sensorId
        ]?.concat([measurement]) || [measurement]
      })

      setSensorMeasurements(receivedMeasurements)
    })

    const removeListener = window.api.measurements.onUpdate(
      async (event, params) => {
        const receivedMeasurements: { [x: string]: Measurement[] } = {}

        params.measurements
          .map(transformToRelativeTime)
          .forEach((measurement) => {
            console.log(measurement)

            receivedMeasurements[measurement.sensorId] = receivedMeasurements[
              measurement.sensorId
            ]?.concat([measurement]) || [measurement]
          })

        setSensorMeasurements((state) => {
          const newState = { ...state }

          Object.keys(receivedMeasurements).forEach((sensorId) => {
            newState[sensorId] =
              newState[sensorId]?.concat(receivedMeasurements[sensorId]) ||
              receivedMeasurements[sensorId]
          })

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
