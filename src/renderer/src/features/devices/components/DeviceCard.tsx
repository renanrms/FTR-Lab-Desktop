import SettingsIcon from '@mui/icons-material/Settings'
import Battery90Icon from '@mui/icons-material/Battery90'
import { IconButton } from '@mui/material'

interface DeviceCardPropType {
  device: {
    name: string
    capabilities: string[]
    network: {
      MACAddress: string
    }
  }
}

export function DeviceCard(props: DeviceCardPropType) {
  const { device } = props

  return (
    <div className="w-full min-h-[180px] border border-neutral-90 dark:border-neutral-30 rounded-md p-4 mb-4 flex flex-col justify-between bg-background text-on-background">
      <div className="h-8 flex items-center">
        <div className="grow text-lg">{device.name}</div>
        <IconButton
          size="small"
          style={{ color: 'var(--md-sys-color-on-background)' }}
        >
          <SettingsIcon></SettingsIcon>
        </IconButton>
        <IconButton
          size="small"
          style={{ color: 'var(--md-sys-color-on-background)' }}
        >
          <Battery90Icon></Battery90Icon>
        </IconButton>
      </div>
      <div className="my-4 grow">
        {device.capabilities.map((capability, index) => (
          <p className="text-sm" key={index}>
            {capability}
          </p>
        ))}
      </div>
      <div className="h-8 flex justify-center items-center">
        <p className="font-mono uppercase">{device.network.MACAddress}</p>
      </div>
    </div>
  )
}
