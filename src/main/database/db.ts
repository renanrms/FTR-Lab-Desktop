import { app } from 'electron'
import path from 'path'
import { Sequelize } from 'sequelize'

/**
 * O paths de armazenamento dos dados em produção podem ser:
 * Windows -> C:\Users\<user>\AppData\Roaming\FTRLab\FTRLab-db.sqlite
 * Linux ->   /home/<user>/.config/FTRLab/FTRLab-db.sqlite
 */

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(
    process.env.NODE_ENV === 'development' ? './' : app.getPath('userData'),
    'FTRLab-db.sqlite',
  ),
  database: 'ftrlab-db',
  logging: false, // TODO: Implementar log para comunicação com o banco
})
