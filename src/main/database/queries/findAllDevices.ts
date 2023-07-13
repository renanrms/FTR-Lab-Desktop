import { DeviceModel, SensorModel } from '../models'

export async function findAllDevices() {
  return (await DeviceModel.findAll({ include: SensorModel }))
    .map((deviceM) => deviceM.dataValues)
    .map((device) => ({
      ...device,
      sensors: device.sensors.map((sensor: any) => sensor.dataValues),
    }))
}
