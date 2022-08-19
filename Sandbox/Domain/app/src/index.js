import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById( 'root' );
const root = createRoot( container );

import App from './App.js';

root.render( <App /> )
