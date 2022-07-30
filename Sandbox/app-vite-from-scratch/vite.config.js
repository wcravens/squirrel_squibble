import { defineConfig } from "vite";
import { loadConfig } from "./loadConfig.js";

export default defineConfig( async( {command, mode } ) => {
  const response = await loadConfig()
  return {
    define: {
      APP_VERSION: JSON.stringify( response.APP_VERSION ),
      APP_NAME:    JSON.stringify( response.APP_NAME )
    }
  }
})
