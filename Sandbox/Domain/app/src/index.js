import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root.js';

const container = document.getElementById( 'root' );
const root = createRoot( container );

root.render( <Root /> );
