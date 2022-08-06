import * as path from 'path'
import { defineConfig } from "vite";

export default defineConfig( async( {command, mode } ) => {
  const response = await loadConfig()
  const APP_NAME = response.APP_NAME
  const APP_VERSION = response.APP_VERSION
  return {
    plugins: [ createHtmlPlugin( { inject: { data: { APP_NAME, APP_VERSION  } } } ) ],
    define: {
      APP_VERSION: JSON.stringify( response.APP_VERSION ),
      APP_NAME:    JSON.stringify( response.APP_NAME )
    },
    resolve: {
      alias: {
        '~bootstrap': path.resolve( __dirname, 'node_modules/bootstrap' ),
        '~bootswatch': path.resolve( __dirname, 'node_modules/bootswatch' ),
      }
    }
  }
})
