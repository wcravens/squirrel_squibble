import SimpleGit from 'simple-git';
import 'pubsub-js';
import PouchDB from 'pouchdb';

var name = "Squibble";
var version = "0.0.0";
var description = "";
var main = "app.js";
var type = "module";
var scripts = {
	test: "echo \"Error: no test specified\" && exit 1"
};
var keywords = [
];
var author = "";
var license = "ISC";
var devDependencies = {
	"@faker-js/faker": "^7.3.0",
	"@reduxjs/toolkit": "^1.8.3",
	acorn: "^8.8.0",
	ajv: "^8.11.0",
	"ajv-formats": "^2.1.1",
	"lorem-ipsum": "^2.0.8",
	pouchdb: "^7.3.0",
	"pubsub-js": "^1.9.4",
	"redux-batched-subscribe": "^0.1.6",
	"redux-logger": "^3.0.6",
	rollup: "^2.77.2",
	"rollup-plugin-import-assertions": "^0.3.0",
	"simple-git": "^3.11.0"
};
var PACKAGE = {
	name: name,
	version: version,
	description: description,
	main: main,
	type: type,
	scripts: scripts,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies
};

const initConfig = async () => SimpleGit().raw(['describe'])
  .then( _ =>
    ({APP_NAME: PACKAGE.name, APP_VERSION: _})
  ).catch( e => {
    console.log(e);
    return false }
  );


/*{
try {
  const lastGitTag = await SimpleGit().raw(['describe']);
  return {APP_NAME: PACKAGE.name, APP_VERSION: lastGitTag}
} catch (error) {
  throw `Error: ${error}`
  return false
}
}*/

const initStorage = async ( name ) =>
{
  try {
    const db = await new PouchDB( "./data/"+name );
    return await db.info();
  } catch (err) {
    throw `Error: ${err}`;
  }
};

const initApp = async () => {
  try {
    const config        = await initConfig();
    config.STORAGE_INFO = await initStorage( config.APP_VERSION );
    return config;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined
  }
};

const CONFIG = initApp();
CONFIG.then( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
