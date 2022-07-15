import React, {useState} from 'react'
import SimpleMde  from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

export default function ReactSimpleMde ()  {
  const [value, setValue] = React.useState('');
  return (
      <SimpleMde value={value} onChange={setValue} />
  );
}
