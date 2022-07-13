import React from 'react';
import { createRoot } from 'react-dom/client'
import md5 from 'md5'
import App from './App';
import ClientInfo from './components/ClientInfo'
//import './custom.scss';

const config = {
  name: 'Squibble Web Client',
  semver: '0.0.1',
  "pre_release": 'pre-alpha 0',
  "build": process.env.REACT_APP_BUILD_ID
}

const CONFIG = Object.freeze( { client: {
  "id": 'squibble_' + md5( config.name + config.build ),
  ...config
}})

const container = document.getElementById( 'root' )
const root = createRoot( container )
root.render(
  <React.StrictMode>
    <App />
    <hr/>
    <ClientInfo {...CONFIG } />
  </React.StrictMode>,
);
