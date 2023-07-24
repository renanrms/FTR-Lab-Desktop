import { useEffect, useState } from 'react'

import { Device } from '@shared/types/Device'

export function useDevices() {
  const [devices, setDevices] = useState<Array<Device>>([])

  useEffect(() => {
    const removeListener = window.api.devices.onDevicesInfoUpdate(
      (event, params) => {
        setDevices(params.devices)
      },
    )

    return removeListener
  }, [])

  return devices
}
