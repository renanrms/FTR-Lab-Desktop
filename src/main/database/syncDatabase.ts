import { sequelize } from './db'

import './models'

/**
 * Sincroniza o banco de dados com os modelos definidos.
 *
 * Deve ser chamada sempre depois da definição de todos os modelos e relacionamentos para o objeto Sequelize utilizado.
 *
 * O banco só deve ser utilizado depois da resolução da promise retornada.
 */
export async function syncDatabase() {
  await sequelize
    .sync({ alter: { drop: true }, logging: false })
    .catch((error) => {
      console.error(error)
    })
}
