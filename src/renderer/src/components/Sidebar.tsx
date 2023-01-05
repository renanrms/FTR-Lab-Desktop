import { DeviceCard } from '../features/devices/components/DeviceCard'

export function Sidebar() {
  const devices = [
    {
      name: 'Mecânica',
      capabilities: ['Photogate', 'Distância'],
      network: {
        MACAddress: 'ff-ff-ff-ff-ff-ff',
      },
    },
    {
      name: 'Termologia',
      capabilities: ['Temperatura', 'Pressão'],
      network: {
        MACAddress: 'ff-ff-ff-ff-ff-ff',
      },
    },
  ]

  return (
    <div className="w-72 p-4 h-full bg-neutral-95 dark:bg-neutral-20 flex flex-col items-center">
      {devices.map((device, index) => (
        <DeviceCard device={device} key={index}></DeviceCard>
      ))}
    </div>
  )
}
