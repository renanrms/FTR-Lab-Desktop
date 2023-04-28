import Switch from '@mui/material/Switch'

import { Device } from '@shared/types/Device'

import { BatteryIndicator } from './BatteryIndicator'

interface DeviceCardProps {
  device: Device
}

function toggleConnection(device: Device) {
  if (!device.connection.socket)
    window.api.devices.openConnection({ deviceId: device.id })
  else {
    window.api.devices.closeConnection({ deviceId: device.id })
  }
}

export function DeviceCard(props: DeviceCardProps) {
  return (
    <div className="w-full min-h-[180px] p-4 mb-4 border border-neutral-90 dark:border-neutral-30 rounded-md flex flex-col justify-between bg-neutral-100 dark:bg-background text-on-background">
      <div className="h-8 flex items-center">
        <div className="grow text-lg">{props.device.name}</div>
        <Switch
          onClick={() => {
            toggleConnection(props.device)
          }}
          checked={!!props.device.connection.socket}
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
