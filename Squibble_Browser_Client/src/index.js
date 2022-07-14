import React from 'react';
import { createRoot } from 'react-dom/client';
import PACKAGE from '../package.json';
import * as Squibble from './Squibble_Application';
import md5 from 'md5';
import App from './App';
import VersionInfo from './components/VersionInfo';
//import './custom.scss';

const config = {
  name:           PACKAGE.Name,
  semver:         PACKAGE.version,
  "pre_release":  PACKAGE.pre_release,
  "build":        process.env.REACT_APP_BUILD_ID
}

const CONFIG = Object.freeze( {
  "id": 'squibble_' + md5( config.name + config.build ),
  ...config
})

const appConfig = Squibble.register( CONFIG, { useHeartbeat: 10 } )

const container = document.getElementById( 'root' )
const root = createRoot( container )
root.render(
  <React.StrictMode>
    <App />
    <footer className={"VersionInfo"}>
      <VersionInfo config={{ type: 'ApplicationInfo', ...appConfig}} />
      <VersionInfo config={{ type: 'ClientInfo', ...CONFIG}} />
    </footer>
  </React.StrictMode>,
);
