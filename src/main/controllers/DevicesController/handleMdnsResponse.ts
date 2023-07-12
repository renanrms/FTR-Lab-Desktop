import { RemoteInfo } from 'dgram'
import { SrvAnswer, TxtAnswer } from 'dns-packet'
import Mdns from 'multicast-dns'

import { models } from '@main/database/db'
import { findAllDevices } from '@main/database/findAllDevices'
import { sendDevicesInfoUpdate } from '@main/ipc/services/sendDevicesInfoUpdate'
import { KeyObjectState } from '@main/utils/KeyObjectState'
import { getTxtAnswerData } from '@main/utils/mdns/getTxtAnswerData'
import { Device } from '@shared/types/Device'

export async function handleMdnsResponse(
  response: Mdns.ResponsePacket,
  rinfo: RemoteInfo,
  devices: KeyObjectState<Device>,
) {
  const srvAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'SRV',
  ) as SrvAnswer

  if (!srvAnswer) return undefined

  const deviceId = srvAnswer.name.split('._ftr-lab._tcp.local')[0]

  const txtAnswer = response.answers.find(
    (answer) =>
      !!answer.name.match(/^.*\._ftr-lab._tcp.local$/) && answer.type === 'TXT',
  ) as TxtAnswer

  const txtAnswerData = txtAnswer ? getTxtAnswerData(txtAnswer) : {}

  const matchingDevice: Device = {
    id: deviceId,
    name: txtAnswerData.name,
    battery: txtAnswerData.battery,
    available: txtAnswerData.available,
    network: {
      address: rinfo.address,
      family: rinfo.family,
      port: srvAnswer.data.port,
    },
    sensors: txtAnswerData.sensors.map((sensor: any) => ({
      ...sensor,
      id: `${deviceId}:${sensor.index}`,
      deviceId,
    })),
    updatedAt: new Date(),
  }

  console.log(`<< ${matchingDevice.id} | MDNS Response`)

  models.Device.upsert({ ...matchingDevice })
  matchingDevice.sensors.forEach((sensor) => {
    models.Sensor.upsert({ ...sensor })
  })

  sendDevicesInfoUpdate({
    devices: await findAllDevices(),
  })
}
