import { DataTypes } from 'sequelize'

import { sequelize } from '../db'

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
