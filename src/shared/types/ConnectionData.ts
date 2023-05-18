import { Socket } from 'node:net'

export interface ConnectionData {
  socket: Socket
  buffer: string
}
