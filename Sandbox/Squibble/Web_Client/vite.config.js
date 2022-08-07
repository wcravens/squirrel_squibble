import * as path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { Config } from "../Application/Config.js";
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

export default defineConfig( async( {command, mode } ) => {
  const config = Config();
  return {
    root: path.resolve(__dirname, '.'),
    server: { port: 8080, hot: true },
    plugins: [
      //eslint(),
      createHtmlPlugin( { inject: {
        data: {
          appName:    config.Application.name,
          appVersion: config.Application.version,
          appBuild:   config.Application.build_id
        }
      } } ) ],
    resolve: {
      alias: {
        '~bootstrap':  path.resolve( __dirname, 'node_modules/bootstrap' ),
        '~bootswatch': path.resolve( __dirname, 'node_modules/bootswatch' )
      }
    }
  };
});
