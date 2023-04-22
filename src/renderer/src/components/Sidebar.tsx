import AddIcon from '@mui/icons-material/Add'
import { IconButton } from '@mui/material'

import { Device } from '@shared/types/Device'

import { DeviceCard } from '../features/devices/components/DeviceCard'

interface SidebarProps {
  devices: Array<Device>
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className="w-72 p-4 pt-6 bg-neutral-95 dark:bg-neutral-20 flex flex-col items-center overflow-y-auto"
      style={{
        gridArea: 'aside',
      }}
    >
      {props.devices.map((device, index) => (
        <DeviceCard device={device} key={index}></DeviceCard>
      ))}
      <IconButton
        className="my-2"
        size="large"
        style={{ color: 'var(--md-sys-color-outline' }}
      >
        <AddIcon></AddIcon>
      </IconButton>
    </aside>
  )
}
