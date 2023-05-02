import { ConnectionData } from '@shared/types/ConnectionData'

export function createHandleData(
  id: string,
  connection: ConnectionData,
  handleDeviceMessage: (message: string, id: string) => void,
) {
  return (data: Buffer) => {
    console.log(`<< ${id} | Data${data}`)

    connection.buffer += data.toString('utf-8')

    const messages = connection.buffer.split(/\n{1,2}/)
    connection.buffer = ''

    messages.forEach((message, index, array) => {
      if (index < array.length) {
        if (message) handleDeviceMessage(message, id)
      } else {
        connection.buffer = message
      }
    })
  }
}
