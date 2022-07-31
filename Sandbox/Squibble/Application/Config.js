import PACKAGE  from './package.json' assert { type: 'json' }
import SimpleGit from 'simple-git'

export const initConfig = async () => {
  try {
    const lastGitTag = await SimpleGit().raw( [ 'describe' ] );
    return { APP_NAME: PACKAGE.name, APP_VERSION: lastGitTag }
  } catch (error) {  console.log( error ) }
}
