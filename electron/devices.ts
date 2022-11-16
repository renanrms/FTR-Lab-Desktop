import { BrowserWindow } from 'electron'
import makeMdns from 'multicast-dns'

const mdns = makeMdns()

export function search() {
  mdns.query({
    questions: [
      {
        name: 'local',
        type: 'A',
      },
      {
        name: 'local',
        type: 'AAAA',
      },
    ],
  })
}

export function startListener() {
  mdns.on('response', (response: any) => {
    // TODO: Filtrar respostas e convereter em um tipo da device a ser construído.
    console.log(response)
    for (const win of BrowserWindow.getAllWindows()) {
      win.webContents.send('mdns-response', response)
    }
  })
}

// mdns.on('response', function (response: any) {
//   console.log('got a response packet:', response)
// })

// // Código para escutar e responder queries.
// // Pode ser útil apenas para uma atualização ativa realizada pelos dispositivos.

mdns.on('query', function (query: any) {
  // console.log('got a query packet:', query)
  mdns.respond({
    answers: [{ name: 'mobile-unit.local', type: 'A', data: 'Meu IPv4' }],
  })
})

// lets query for an A record for 'mobile-unit.local'
mdns.query({
  questions: [
    {
      name: 'mobile-unit.local',
      type: 'A',
    },
  ],
})
