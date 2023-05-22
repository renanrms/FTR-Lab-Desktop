import { useEffect, useState } from 'react'

import { db } from '@renderer/constants/db'
import { SensorBoundaries } from '@shared/types/Measurement'

import { mergeBoundaries } from '../utils/mergeBoundaries'

export function useMeasurements() {
  const [storedRanges, setStoredRanges] = useState<SensorBoundaries>({})

  useEffect(() => {
    const initialRx = db.transaction('measurements', 'readwrite')
    const store = initialRx.objectStore('measurements')

    store.getAll().then(async (measurements) => {
      const initiallyStoredRanges: SensorBoundaries = {}
      measurements.forEach((measurement) => {
        initiallyStoredRanges[measurement.sensorId] = mergeBoundaries(
          initiallyStoredRanges[measurement.sensorId],
          {
            min: measurement.timestamp,
            max: measurement.timestamp,
          },
        )
      })
      setStoredRanges(initiallyStoredRanges)
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

        setStoredRanges((state) => {
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

  const clearMeasurements = async () => {
    const tx = db.transaction('measurements', 'readwrite')
    const store = tx.objectStore('measurements')
    store.clear()
    setStoredRanges({})
    return await tx.done
  }

  return { storedRanges, clearMeasurements }
}
