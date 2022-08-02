import PACKAGE  from '../package.json' assert { type: 'json' }
import SimpleGit from 'simple-git'

export const initConfig = async () => SimpleGit().raw(['describe'])
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

