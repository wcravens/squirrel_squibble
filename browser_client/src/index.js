import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import './custom.scss';

const AppInfo = {
  name: process.env.REACT_APP_NAME,
  version: process.env.REACT_APP_VERSION,
  branch: process.env.REACT_APP_BRANCH,
  build: process.env.REACT_APP_BUILD
}
console.log( "AppInfo:" + JSON.stringify( AppInfo ) )

const container = document.getElementById( 'root' )
const root = createRoot( container )
root.render(
  <React.StrictMode>
    <App />
    <hr/>
    <pre style={{"fontSize": "x-small"}}>{AppInfo.name} {AppInfo.version}, {AppInfo.branch} Build: {AppInfo.build}</pre>
  </React.StrictMode>,
);
