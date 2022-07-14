import React from 'react';
import { createRoot } from 'react-dom/client';
import PACKAGE from '../package.json';
import { appInit, subscribeToAppState, subscribeToInfo } from './Squibble_Application';
import App from './App';
import VersionInfo from './components/VersionInfo';
//import './custom.scss';

const CONFIG = {
  name:           PACKAGE.Name,
  semver:         PACKAGE.version,
  "pre_release":  PACKAGE.pre_release,
  "build":        process.env.REACT_APP_BUILD_ID
}

const container = document.getElementById( 'root' )
const root = createRoot( container )

const updateApp = ( msg, payload ) => {
  console.log( payload )
  const data = JSON.parse( payload ).msg
  console.log ( data )
  const newInfo = data[ data.type ]
}
//subscribeToAppState( updateApp )
//subscribeToAppState( console.log )
//subscribeToInfo( console.log )

appInit( CONFIG ).then( appConfig =>
  root.render(
    <React.StrictMode>
      <App />
      <footer className={"VersionInfo"}>
        <VersionInfo config={{ type: 'ApplicationInfo', ...appConfig}} />
        <VersionInfo config={{ type: 'ClientInfo', ...CONFIG}} />
      </footer>
    </React.StrictMode>,
  )
).catch( console.log )
