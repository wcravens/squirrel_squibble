import React, { MutableRefObject, useRef, useEffect } from 'react';
import SimpleInput from './SimpleInput';
import ContentEditable from 'react-contenteditable';
import { HotKeys } from 'react-hotkeys';

const keyMap = {
  ESCAPE: 'escape',
  EASTER_EGG:"j k j k h l h l enter"
};

const handlers = {
  EASTER_EGG: console.log,
  ESCAPE: console.log
};

const Root = ( props ) => {
  let _containerRef = useRef(null);

  useEffect( () => _containerRef.current.focus() );

  return (
    <HotKeys keyMap = {keyMap} handlers={ handlers } innerRef={_containerRef} >

      <h2>Root World From React-Rollup</h2>
      <SimpleInput content={"Root, World!" }/>
      <ContentEditable html={ "Root, world!" } onChange={ _ => console.log( _.target.value ) } tagName={'article'} />
    </HotKeys>
  ); // eslint-disable
};
export default Root;
