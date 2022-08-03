import PACKAGE  from '../package.json'
// Note: package.json is supplemented via rollup git-info plugin.

export const initConfig = () => ({ APP_NAME: PACKAGE.name, APP_VERSION: PACKAGE.gitCommitHash })