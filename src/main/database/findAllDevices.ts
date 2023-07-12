import { models } from './db'

export async function findAllDevices() {
  return (await models.Device.findAll({ include: 'sensors' }))
    .map((deviceModel) => ({
      ...deviceModel.dataValues,
    }))
    .map((sensorModel) => ({
      ...sensorModel,
      sensors: sensorModel.sensors.map((sensor: any) => sensor.dataValues),
    }))
}
