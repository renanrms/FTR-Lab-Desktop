export interface Device {
  id: string
  name?: string
  capabilities?: Array<string>
  network: {
    address: string
    family: 'IPv4' | 'IPv6'
  }
  updatedAt: Date
}
