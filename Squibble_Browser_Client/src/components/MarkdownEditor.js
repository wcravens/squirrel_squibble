import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownEditor() {
  const [value, setValue] = React.useState('');
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
}
