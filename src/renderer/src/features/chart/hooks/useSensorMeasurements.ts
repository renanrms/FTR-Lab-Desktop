import { useEffect, useState } from 'react'

import { db } from '@renderer/constants/db'
import { SensorId } from '@shared/types/Device'
import { Boundaries, Measurement } from '@shared/types/Measurement'

export function useSensorMeasurements(
  sensorId: SensorId,
  targetRange: Boundaries,
  storedRange: Boundaries,
) {
  const [loadedRange, setLoadedRange] = useState<Boundaries>({
    min: Infinity,
    max: -Infinity,
  })
  const [loadedMeasurements, setLoadedMeasurements] = useState<Measurement[]>(
    [],
  )

  useEffect(() => {
    const tx = db.transaction('measurements', 'readonly')
    const store = tx.objectStore('measurements')
    const index = store.index('timestamp')
    const range = IDBKeyRange.bound(targetRange.min, targetRange.max)

    // TODO: Corrigir para buscar apenas no intervalo selecionado e buscar apenas as medições que faltam.
    index
      .getAll(range)
      .then((result) =>
        result.filter((measurement) => measurement.sensorId === sensorId),
      )
      .then((result) => {
        setLoadedMeasurements(result)
        const timestamps = result.map((measurement) => measurement.timestamp)
        setLoadedRange({
          min: Math.min(...timestamps),
          max: Math.max(...timestamps),
        })
      })
  }, [sensorId, targetRange, storedRange])

  return { loadedRange, loadedMeasurements }
}
