import { Device } from '@shared/types/Device'

export function deviceToStatusText(device: Device) {
  if (device.connected) return 'Conectado'
  else if (device.available) return 'Disponível'
  else if (device.reachable) return 'Ocupado'
  else return 'Inacessível'
}
