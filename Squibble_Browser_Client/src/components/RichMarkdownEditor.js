import React from 'react'
import Editor from 'rich-markdown-editor';

export default function RichMarkdownEditor( args ) {
  const [value, setValue] = React.useState('');
  return (
    <Editor {...args}/>
  );
}
