import PACKAGE  from './package.json' assert { type: 'json' }
import SimpleGit from 'simple-git'
const git = SimpleGit()

export const loadConfig = async () => {
  return {
    'APP_NAME':     JSON.stringify( PACKAGE.name ),
    'APP_VERSION':  await git.raw( [ 'describe' ] ).then( JSON.stringify )
  }
}

