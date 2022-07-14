import React from 'react';
import RichMarkdownEditor from './RichMarkdownEditor';

// Using: https://www.npmjs.com/package/rich-markdown-editor
// Storybook for editor: http://localhost:6007/?path=/story/editor--default

export default {
  component: "RichMarkdownEditor",
}

const Template = (args) => <RichMarkdownEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  defaultValue: `# Welcome
Just an easy to use **Markdown** editor with \`slash commands\``,
};
