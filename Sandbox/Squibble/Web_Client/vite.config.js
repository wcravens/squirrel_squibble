import * as path from 'path'
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import config from "../Application/Config.js"
import gitInfo from 'rollup-plugin-git-info';
import eslint from '@rollup/plugin-eslint';

export default defineConfig( async( {command, mode } ) => {
  return {
    plugins: [ createHtmlPlugin( { inject: {
      data: {
        //config.Application.name
      }
    } } ) ],
    define: {
      APP_VERSION: JSON.stringify( response.APP_VERSION ),
      APP_NAME:    JSON.stringify( response.APP_NAME )
    },
    resolve: {
      alias: {
        '~bootstrap':  path.resolve( __dirname, 'node_modules/bootstrap' ),
        '~bootswatch': path.resolve( __dirname, 'node_modules/bootswatch' ),
      }
    }
  }
})
