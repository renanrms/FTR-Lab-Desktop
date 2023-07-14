import { DataTypes } from 'sequelize'

import { sequelize } from '../db'

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
