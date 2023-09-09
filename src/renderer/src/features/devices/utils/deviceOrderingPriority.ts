import { Device } from '@shared/types/Device'

export function deviceOrderingPriority(device: Device) {
  if (device.connected) return 2
  else if (device.available) return 1
  else return 0
}
