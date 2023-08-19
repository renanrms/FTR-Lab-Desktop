import { ConnectionData } from '@shared/types/ConnectionData'

export function createHandleData(
  id: string,
  connection: ConnectionData,
  handleDeviceMessage: (message: string, id: string) => Promise<void>,
) {
  return async (data: Buffer) => {
    /**
     * TODO: Resolver problema de concorrência. Quando a frequência de envio é muito alta,
     * fica mais de uma instância desta função na memória e o buffer compartilhado gera um
     * problema de concorrência.
     */
    console.log(`<< ${id} | Data (${data.length} bytes)`)
    // console.log(data.toString('utf-8'))

    let messages: string[] = []

    // Seria interessante proteger o buffer com um lock.
    connection.buffer += data.toString('utf-8')
    messages = connection.buffer.split(/\n{1,2}/)
    connection.buffer = messages.pop() || ''

    messages = messages.filter((message) => message.length > 0)

    for (const message of messages) {
      await handleDeviceMessage(message, id)
    }
  }
}
