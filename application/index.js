import { v4 as uuidv4 } from 'uuid'
import Store from 'pouchdb'
import Find  from 'pouchdb-find'
Store.plugin(Find)
const applicationStore = new Store('Apples')

async function _register_client( clientInfo ) {
  clientInfo._id = uuidv4();
  const result = await applicationStore.put( clientInfo )
  return result;
}
export default const Application = () => {
  return{ register_client: _register_client }
}
