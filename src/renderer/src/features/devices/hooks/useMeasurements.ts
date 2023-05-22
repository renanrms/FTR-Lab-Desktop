import { useEffect, useState } from 'react'

import { db } from '@renderer/constants/db'
import { SensorBoundaries } from '@shared/types/Measurement'

import { mergeBoundaries } from '../utils/mergeBoundaries'

export function useMeasurements() {
  const [timeRanges, setTimeRanges] = useState<SensorBoundaries>({})

  useEffect(() => {
    // TODO: inicializar estado ranges ou apagar dados do banco.
    const initialRx = db.transaction('measurements', 'readwrite')
    const store = initialRx.objectStore('measurements')

    store
      .getAll()
      .then(async (measurements) => {
        const storedRanges: SensorBoundaries = {}
        measurements.forEach((measurement) => {
          storedRanges[measurement.sensorId] = mergeBoundaries(
            storedRanges[measurement.sensorId],
            {
              min: measurement.timestamp,
              max: measurement.timestamp,
            },
          )
        })
        return storedRanges
      })
      .then((storedRanges) => {
        setTimeRanges(storedRanges)
      })

    const removeListener = window.api.devices.onMeasurementsUpdate(
      async (event, params) => {
        const receivedRanges: SensorBoundaries = {}

        params.measurements.forEach((measurement) => {
          receivedRanges[measurement.sensorId] = mergeBoundaries(
            receivedRanges[measurement.sensorId],
            {
              min: measurement.timestamp,
              max: measurement.timestamp,
            },
          )
        })

        setTimeRanges((state) => {
          const newState = { ...state }
          Object.keys(receivedRanges).forEach((sensor) => {
            newState[sensor] = mergeBoundaries(
              newState[sensor],
              receivedRanges[sensor],
            )
          })
          return newState
        })

        const tx = db.transaction('measurements', 'readwrite')
        const store = tx.objectStore('measurements')

        await Promise.all(
          params.measurements.map((measurement) => store.put(measurement)),
        )

        await tx.done
      },
    )

    return removeListener
  }, [])

  return timeRanges
}
