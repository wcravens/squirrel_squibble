import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.css'
import './custom.scss';

console.log( "Build: " + process.env.REACT_APP_BRANCH + ":"  + process.env.REACT_APP_VERSION )
ReactDOM.render(
  <React.StrictMode>
    <App />
    <hr/>
    <pre>Squirrel Squibble Build: {process.env.REACT_APP_BRANCH} {process.env.REACT_APP_VERSION}</pre>
  </React.StrictMode>,
  document.getElementById('root')
);
