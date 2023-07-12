import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  database: 'ftrlab-db',
  logging: false, // TODO: Implementar log para comunicação com o banco
})

const Device = sequelize.define(
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

const Sensor = sequelize.define(
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

const Measurement = sequelize.define(
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

Device.hasMany(Sensor, { as: 'sensors', foreignKey: 'deviceId' })
Sensor.hasMany(Measurement, { as: 'measurements', foreignKey: 'sensorId' })

sequelize.sync({ alter: { drop: true }, logging: false }).catch((error) => {
  console.error(error)
})

export const models = { Device, Measurement, Sensor }
