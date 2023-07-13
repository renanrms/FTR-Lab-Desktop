import { DataTypes } from 'sequelize'

import { sequelize } from '../db'

export const DeviceModel = sequelize.define(
  'device',
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
    tableName: 'devices',
  },
)

export const SensorModel = sequelize.define(
  'sensor',
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
    tableName: 'sensors',
    timestamps: false,
  },
)

export const MeasurementModel = sequelize.define(
  'measurement',
  {
    // Não sei se é necessário o ID
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: 'measurements',
    timestamps: false,
  },
)

DeviceModel.hasMany(SensorModel)
SensorModel.belongsTo(DeviceModel)

SensorModel.hasMany(MeasurementModel)
MeasurementModel.belongsTo(SensorModel)
