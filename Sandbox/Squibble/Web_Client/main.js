import javascriptLogo from './javascript.svg';
import bootstrap   from 'bootstrap/dist/js/bootstrap';
import { initApp } from '../Application/App.js';
import {
  insertStyleElementWithTheme,
  listAvailableThemes,
  removeAllStyleElementsFromHead,
  switchTheme
} from "./StyleThemes.js";

insertStyleElementWithTheme( 'Bootstrap' );
//switchTheme( 'Sketchy'  );

initApp().then( console.log );

var global = window;
