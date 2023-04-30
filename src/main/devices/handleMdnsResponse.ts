import { RemoteInfo } from 'dgram'
import { SrvAnswer, TxtAnswer } from 'dns-packet'
import Mdns from 'multicast-dns'

import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
import { getTxtAnswerData } from '@main/utils/mdns/getTxtAnswerData'
import { State } from '@main/utils/State'
import { Device } from '@shared/types/Device'

export function handleMdnsResponse(
  response: Mdns.ResponsePacket,
  rinfo: RemoteInfo,
  devicesState: State<Array<Device>>,
) {
  const srvAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'SRV',
  ) as SrvAnswer

  if (!srvAnswer) return undefined

  // console.log(response.answers)
  // console.log(rinfo)

  const txtAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'TXT',
  ) as TxtAnswer

  const txtAnswerData = txtAnswer ? getTxtAnswerData(txtAnswer) : {}

  const matchingDevice: Device = {
    id: srvAnswer.name.split('._ftr-lab._tcp.local')[0],
    name: txtAnswerData.name,
    battery: txtAnswerData.battery,
    available: txtAnswerData.available,
    network: {
      address: rinfo.address,
      family: rinfo.family,
      port: srvAnswer.data.port,
    },
    connection: {},
    sensors: txtAnswerData.sensors,
    updatedAt: new Date(),
  }

  console.log(matchingDevice)

  let devices = devicesState.get()

  if (devices.some((device) => device.id === matchingDevice.id)) {
    devices = devices.map((device) => {
      if (device.id === matchingDevice.id) {
        return {
          ...device,
          ...matchingDevice,
        }
      } else {
        return device
      }
    })
  } else {
    devices.push(matchingDevice)
  }

  devicesState.set(devices)

  sendDevicesInfoUpdate({ devices: devicesState.get() })
}
