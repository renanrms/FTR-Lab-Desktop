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
    reachable: {
      type: DataTypes.BOOLEAN,
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
    timeSynced: {
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
