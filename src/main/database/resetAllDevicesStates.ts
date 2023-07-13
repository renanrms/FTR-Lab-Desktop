import { Op } from 'sequelize'

import { DeviceModel } from './models'

export async function resetAllDevicesStates() {
  DeviceModel.update(
    { connected: false, available: false },
    { where: { [Op.or]: [{ connected: true }, { available: true }] } },
  )
}
