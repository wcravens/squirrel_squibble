import { defineConfig } from "vite";
import { loadConfig } from "./loadConfig.js";
import { createHtmlPlugin } from "vite-plugin-html"

export default defineConfig( async( {command, mode } ) => {
  const response = await loadConfig()
  const APP_NAME = response.APP_NAME
  const APP_VERSION = response.APP_VERSION
  return {
    plugins: [ createHtmlPlugin( { inject: { data: { APP_NAME, APP_VERSION  } } } ) ],
    define: {
      APP_VERSION: JSON.stringify( response.APP_VERSION ),
      APP_NAME:    JSON.stringify( response.APP_NAME )
    }
  }
})
