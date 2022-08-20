import { GlobalHotKeys, configure, getApplicationKeyMap } from 'react-hotkeys-ce';
import React from 'react';

const keyMap = {
  TEST: 't',
};

const handlers = {
  TEST: () => console.log( "Test" ),
};

configure({
  //ignoreRepeatedEventsWhenKeyHeldDown: true,
  logLevel: 'warn',
  ignoreTags: [],
  //ignoreKeymapAndHandlerChangesByDefault: true,
  //simulateMissingKeyPressEvents: false
});
const HotKeys = ( props ) => ( <GlobalHotKeys keyMap = {keyMap} handlers={ handlers } /> );
export default HotKeys;
