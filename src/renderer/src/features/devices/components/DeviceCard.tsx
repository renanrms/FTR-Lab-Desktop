import SettingsIcon from '@mui/icons-material/Settings'
import Battery90Icon from '@mui/icons-material/Battery90'
import { IconButton } from '@mui/material'
import { Device } from '~/src/shared/types/Device'

interface DeviceCardProps {
  device: Device
}

export function DeviceCard(props: DeviceCardProps) {
  return (
    <div className="w-full min-h-[180px] p-4 mb-4 border border-neutral-90 dark:border-neutral-30 rounded-md flex flex-col justify-between bg-neutral-100 dark:bg-background text-on-background">
      <div className="h-8 flex items-center">
        <div className="grow text-lg">{props.device.name}</div>
        <IconButton style={{ color: 'var(--md-sys-color-on-surface-variant' }}>
          <SettingsIcon></SettingsIcon>
        </IconButton>
        <Battery90Icon
          sx={{
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        ></Battery90Icon>
      </div>
      <div className="my-4 grow">
        {props.device.capabilities?.map((capability, index) => (
          <p className="text-sm" key={index}>
            {capability}
          </p>
        ))}
      </div>
      <div className="h-8 flex justify-center items-center">
        <p className="font-mono uppercase">{props.device.id}</p>
      </div>
    </div>
  )
}
