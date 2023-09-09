import { deviceOrderingPriority } from '@renderer/features/devices/utils/deviceOrderingPriority'
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
      {props.devices
        .sort((a, b) => deviceOrderingPriority(a) - deviceOrderingPriority(b))
        .map((device, index) => (
          <DeviceCard device={device} key={index}></DeviceCard>
        ))}
    </aside>
  )
}
