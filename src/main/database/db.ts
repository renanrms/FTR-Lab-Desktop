import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './FTRLab-db.sqlite', // TODO: Em produção, colocar na pasta de dados adequada para não ficar salvo ao lado do executável
  database: 'ftrlab-db',
  logging: false, // TODO: Implementar log para comunicação com o banco
})
