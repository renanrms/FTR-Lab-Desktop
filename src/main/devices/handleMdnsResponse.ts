import { RemoteInfo } from 'dgram'
import { SrvAnswer, TxtAnswer } from 'dns-packet'
import Mdns from 'multicast-dns'

import { KeyObjectState } from '@main/utils/KeyObjectState'
import { getTxtAnswerData } from '@main/utils/mdns/getTxtAnswerData'
import { Device } from '@shared/types/Device'

export function handleMdnsResponse(
  response: Mdns.ResponsePacket,
  rinfo: RemoteInfo,
  devicesState: KeyObjectState<Device>,
) {
  const srvAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'SRV',
  ) as SrvAnswer

  if (!srvAnswer) return undefined

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
    sensors: txtAnswerData.sensors,
    updatedAt: new Date(),
  }

  console.log(`<< ${matchingDevice.id} | MDNS Response`)

  devicesState.setObject(matchingDevice.id, matchingDevice)
}
