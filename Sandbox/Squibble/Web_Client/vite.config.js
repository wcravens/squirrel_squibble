import * as path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import config from "../Application/Config.js";
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

export default defineConfig( async( {command, mode } ) => {
  return {
    root: path.resolve(__dirname, '.'),
    server: { port: 8080, hot: true },
    plugins: [
      eslint(),
      createHtmlPlugin( { inject: {
        data: {
          title: config.Application.name,
          version: config.Application.version
        }
      } } ) ],
    define: {
      APP_NAME:    config.Application.name,
      APP_VERSION: config.Application.build_id
    },
    resolve: {
      alias: {
        '~bootstrap':  path.resolve( __dirname, 'node_modules/bootstrap' ),
        '~bootswatch': path.resolve( __dirname, 'node_modules/bootswatch' )
      }
    }
  }
})
