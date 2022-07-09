import Application from '../Application/index.js'
import { v4 as uuidv4 } from 'uuid'
import Store from 'pouchdb'
import Find  from 'pouchdb-find'
Store.plugin(Find)
const applicationStore = new Store('Apples')

const myApp = Application();
async function main(){
  const myClientKey = await myApp.register_client({});
  console.log( myClientKey.id )
}

main()
