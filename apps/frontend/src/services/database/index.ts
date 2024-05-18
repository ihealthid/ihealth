import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { classificationSchema } from './schema/classification.schema';

const database = await createRxDatabase({
  name: 'mentarimedika',
  storage: getRxStorageDexie()
})

await database.addCollections({
  classificationDisease: {
    schema: classificationSchema
  }
})

export default database