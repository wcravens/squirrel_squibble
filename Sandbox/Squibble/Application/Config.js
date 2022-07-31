import PACKAGE  from './package.json' assert { type: 'json' }
import SimpleGit from 'simple-git'

export const loadConfig = async () => ({
    'APP_NAME':     PACKAGE.name,
    'APP_VERSION':  await SimpleGit().raw( [ 'describe' ] ).then( _ => _.trim() )
})
