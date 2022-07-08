import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.css'
import './custom.scss';

console.log( "Build: " + process.env.REACT_APP_BRANCH + ":"  + process.env.REACT_APP_VERSION )
const AppInfo = {
  name: process.env.REACT_APP_NAME,
  version: process.env.REACT_APP_VERSION,
  branch: process.env.REACT_APP_BRANCH,
  build: process.env.REACT_APP_BUILD
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <hr/>
    <pre>{AppInfo.name} {AppInfo.version}, {AppInfo.branch} Build: {AppInfo.build}</pre>
  </React.StrictMode>,
  document.getElementById('root')
);
