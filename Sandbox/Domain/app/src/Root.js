import React, { MutableRefObject, useRef, useEffect } from 'react';
import SimpleInput from './SimpleInput';
import HotKeys from './HotKeys';
import ContentEditable from 'react-contenteditable';
const Root = ( props ) => {

  return (
    <div>
      <HotKeys />
      <h2>Root World From React-Rollup</h2>
      <SimpleInput content={"Root, World!" }/>
      <ContentEditable html={ "Root, world!" } onChange={ _ => console.log( _.target.value ) } tagName={'article'} />
    </div>
  );
};
export default Root;
