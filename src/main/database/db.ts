import { app } from 'electron'
import path from 'path'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  // Windows -> C:\Users\<user>\AppData\Roaming\FTRLab\FTRLab-db.sqlite
  storage: path.join(app.getPath('userData'), 'FTRLab-db.sqlite'),
  database: 'ftrlab-db',
  logging: false, // TODO: Implementar log para comunicação com o banco
})
