import { DeviceModel } from '../models'

export async function findAllDevices() {
  return (await DeviceModel.findAll({ include: 'sensors' }))
    .map((deviceM) => ({
      ...deviceM.dataValues,
    }))
    .map((sensorM) => ({
      ...sensorM,
      sensors: sensorM.sensors.map((sensor: any) => sensor.dataValues),
    }))
}
