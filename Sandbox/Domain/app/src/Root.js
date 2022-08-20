import React, { MutableRefObject, useRef, useEffect } from 'react';
import SimpleInput from './SimpleInput';
import HotKeys from './HotKeys';
import ContentEditable from 'react-contenteditable';
const Root = ( props ) => {

  return (
    <div>
      <HotKeys />
      <h1>IAAT</h1>
      <h2>SimpleInput</h2>
      <SimpleInput content={"Root, World!" }/>
      <h2>ContentEditable</h2>
      <ContentEditable html={ "Root, world!" } onChange={ _ => console.log( _.target.value ) } tagName={'article'} />
    </div>
  );
};
export default Root;
