import { Device } from '@shared/types/Device'

/**
 * Quanto menor mais prioridade
 */
export function deviceStatusPriority(device: Device) {
  if (device.connected) return 0
  else if (device.available) return 1
  else if (device.reachable) return 2
  else return 3
}

export function devicePriorityCompare(a: Device, b: Device) {
  const statusCompare = deviceStatusPriority(a) - deviceStatusPriority(b)

  return statusCompare
}
