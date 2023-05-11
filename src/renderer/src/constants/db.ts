import { openDB } from 'idb'

export const db = await openDB('ftr-lab', 1, {
  upgrade: function (upgradeDb) {
    console.log('Creating a new object store.')
    if (!upgradeDb.objectStoreNames.contains('measurements')) {
      upgradeDb.createObjectStore('measurements', {
        keyPath: 'id',
        autoIncrement: true,
      })
    }
  },
})
