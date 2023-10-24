import { Dispatch, SetStateAction } from 'react'

import { DeviceCard } from '@renderer/features/devices/components/DeviceCard'
import { devicePriorityCompare } from '@renderer/features/devices/utils/deviceOrderingPriority'
import { ControlCard } from '@renderer/features/measurements/components/ControlCard'
import { Device } from '@shared/types/Device'

interface SidebarProps {
  devices: Array<Device>
  timeRange: number
  setTimeRange: Dispatch<SetStateAction<number>>
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      className="w-72 p-4 pt-6 bg-neutral-95 dark:bg-neutral-20 flex flex-col items-center overflow-y-auto"
      style={{
        gridArea: 'aside',
      }}
    >
      <ControlCard
        timeRange={props.timeRange}
        setTimeRange={props.setTimeRange}
      />

      {props.devices.sort(devicePriorityCompare).map((device) => (
        <DeviceCard device={device} key={device.id}></DeviceCard>
      ))}
    </aside>
  )
}
