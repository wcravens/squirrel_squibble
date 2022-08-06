import javascriptLogo from './javascript.svg';
import bootstrap   from 'bootstrap/dist/js/bootstrap';

import {
  insertStyleElementWithTheme,
  listAvailableThemes,
  removeAllStyleElementsFromHead,
  switchTheme
} from "./StyleThemes.js";

insertStyleElementWithTheme( 'Bootstrap' );
//switchTheme( 'Sketchy'  );
