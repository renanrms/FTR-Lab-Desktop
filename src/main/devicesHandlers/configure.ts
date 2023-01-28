import { BrowserWindow } from 'electron'
import makeMdns from 'multicast-dns'

// import { DevicesUpdateData } from '@shared/types/ipc'
import { CHANNELS } from '@shared/constants/channels'
import { DeviceInfo } from '@shared/types/ipc'
import { State } from '../utils/State'

const mdns = makeMdns()

export function search() {
  mdns.query({
    questions: [
      {
        // name: 'ftr-lab.local',
        name: 'local',
        type: 'A',
      },
      {
        // name: 'ftr-lab.local',
        name: 'local',
        type: 'AAAA',
      },
    ],
  })
}

export function startListener(devices: State<Array<DeviceInfo>>) {
  mdns.on('response', (response: any) => {
    console.log(response)

    const devicesUpdated = [
      ...devices.getState(),
      {
        id: 'ff-ff-ff-ff-ff-ff',
        name: 'Mecânica',
        capabilities: ['Photogate', 'Distância'],
        network: {
          MACAddress: 'ff-ff-ff-ff-ff-ff',
        },
      },
    ]

    devices.setState(devicesUpdated)

    const mainWindow = BrowserWindow.getAllWindows()[0]

    mainWindow.webContents.send(CHANNELS.DEVICES.INFO.UPDATE, devicesUpdated)
  })
}

// mdns.on('response', function (response: any) {
//   console.log('got a response packet:', response)
// })

// // Código para escutar e responder queries.
// // Pode ser útil apenas para uma atualização ativa realizada pelos dispositivos.

// mdns.on('query', function (query: any) {
//   // console.log('got a query packet:', query)
//   mdns.respond({
//     answers: [{ name: 'ftr-lab.local', type: 'A', data: 'Meu IPv4' }],
//   })
// })

// // lets query for an A record for 'mobile-unit.local'
// mdns.query({
//   questions: [
//     {
//       name: 'ftr-lab.local',
//       type: 'A',
//     },
//   ],
// })
