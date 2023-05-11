export type SensorId = string

export interface Device {
  id: string
  name?: string
  available?: boolean
  connected?: boolean
  battery?: {
    level: number
    charging: boolean
  }
  sensors?: [{ quantity: string }]
  network: {
    address: string
    family: 'IPv4' | 'IPv6'
    port: number
  }
  updatedAt: Date
}
