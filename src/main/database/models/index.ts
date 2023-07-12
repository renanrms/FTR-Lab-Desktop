import { DataTypes } from 'sequelize'

import { sequelize } from '../db'

export const DeviceModel = sequelize.define(
  'Device',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    connected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    battery: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    network: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'Devices',
  },
)

export const SensorModel = sequelize.define(
  'Sensor',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    index: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Sensors',
    timestamps: false,
  },
)

export const MeasurementModel = sequelize.define(
  'Measurement',
  {
    sensorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: 'Measurements',
    timestamps: false,
  },
)

DeviceModel.hasMany(SensorModel, { as: 'sensors', foreignKey: 'deviceId' })
SensorModel.hasMany(MeasurementModel, {
  as: 'measurements',
  foreignKey: 'sensorId',
})
