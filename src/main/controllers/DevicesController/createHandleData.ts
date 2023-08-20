import { ConnectionData } from '@shared/types/ConnectionData'

export function createHandleData(
  id: string,
  connection: ConnectionData,
  handleDeviceMessage: (message: string, id: string) => Promise<void>,
) {
  return async (data: Buffer) => {
    console.log(`<< ${id} | Data (${data.length} bytes)`)
    // console.log(data.toString('utf-8'))

    let messages: string[] = []

    connection.buffer += data.toString('utf-8')
    messages = connection.buffer.split(/\n{1,2}/)
    connection.buffer = messages.pop() || ''

    for (const message of messages) {
      if (message) await handleDeviceMessage(message, id)
    }
  }
}
