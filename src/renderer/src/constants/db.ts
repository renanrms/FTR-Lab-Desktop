import { openDB } from 'idb'

export const db = await openDB('ftr-lab', 1, {
  upgrade: function (upgradeDb) {
    console.log('Criando store para medições.')
    if (!upgradeDb.objectStoreNames.contains('measurements')) {
      upgradeDb
        .createObjectStore('measurements', {
          keyPath: 'id',
          autoIncrement: true,
        })
        .createIndex('timestamp', 'timestamp')
    }
  },
})
