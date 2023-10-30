import { app } from 'electron'
import path from 'path'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(app.getPath('userData'), 'FTRLab-db.sqlite'),
  database: 'ftrlab-db',
  logging: false, // TODO: Implementar log para comunicação com o banco
})
