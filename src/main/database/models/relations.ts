import { DeviceModel } from './DeviceModel'
import { MeasurementModel } from './MeasurementModel'
import { SensorModel } from './SensorModel'

// Relação Device 1 x N Sensor
DeviceModel.hasMany(SensorModel)
SensorModel.belongsTo(DeviceModel)

// Relação Sensor 1 x N Measurement
SensorModel.hasMany(MeasurementModel)
MeasurementModel.belongsTo(SensorModel)
