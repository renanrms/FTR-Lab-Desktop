import Switch from '@mui/material/Switch'
import { useMutation } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

import { Device } from '@shared/types/Device'

import { toggleConnection } from '../services/toggleConnection'
import { BatteryIndicator } from './BatteryIndicator'

interface DeviceCardProps {
  device: Device
}

export function DeviceCard(props: DeviceCardProps) {
  const connectionMutation = useMutation({ mutationFn: toggleConnection })

  return (
    <div
      className={twMerge(
        'w-full min-h-[180px] p-4 mb-4 border border-neutral-90 dark:border-neutral-30 rounded-md flex flex-col justify-between bg-neutral-100 dark:bg-background text-on-background',
        !props.device.available && 'opacity-60',
      )}
    >
      <div className="h-8 flex items-center">
        <div className="grow text-lg">{props.device.name}</div>
        <Switch
          onClick={() => {
            connectionMutation.mutate(props.device)
          }}
          checked={!!props.device.connected}
          disabled={!props.device.available || connectionMutation.isLoading}
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
