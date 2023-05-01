import { useState } from 'react'

import Switch from '@mui/material/Switch'

import { Device } from '@shared/types/Device'

import { BatteryIndicator } from './BatteryIndicator'

interface DeviceCardProps {
  device: Device
}

async function toggleConnection(device: Device, setActionInProgress: Function) {
  try {
    setActionInProgress(true)
    if (!device.connected)
      await window.api.devices.openConnection({ deviceId: device.id })
    else {
      await window.api.devices.closeConnection({ deviceId: device.id })
    }
    setActionInProgress(false)
  } catch (error) {
    console.log(error)
    setActionInProgress(false)
  }
}

export function DeviceCard(props: DeviceCardProps) {
  const [actionInProgress, setActionInProgress] = useState(false)

  return (
    <div className="w-full min-h-[180px] p-4 mb-4 border border-neutral-90 dark:border-neutral-30 rounded-md flex flex-col justify-between bg-neutral-100 dark:bg-background text-on-background">
      <div className="h-8 flex items-center">
        <div className="grow text-lg">{props.device.name}</div>
        <Switch
          onClick={async () => {
            await toggleConnection(props.device, setActionInProgress)
          }}
          checked={!!props.device.connected}
          disabled={actionInProgress}
        />
        {props.device.battery && <BatteryIndicator {...props.device.battery} />}
      </div>
      <div className="my-4 grow">
        {props.device.sensors?.map((sensor, index) => (
          <p className="text-sm" key={index}>
            {sensor.quantity}
          </p>
        ))}
      </div>
      <div className="h-8 flex justify-center items-center">
        <p className="font-mono uppercase">{props.device.id}</p>
      </div>
    </div>
  )
}
