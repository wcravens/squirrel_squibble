import React from 'react';
import MarkdownEditor from "./MarkdownEditor";

// Using: https://www.npmjs.com/package/@uiw/react-md-editor

export default {
  component: "MarkdownEditor",
}

const Template = (args) => <MarkdownEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
