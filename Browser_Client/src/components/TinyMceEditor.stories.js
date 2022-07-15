import React from 'react';
import TinyMceEditor from "./TinyMceEditor";

export default {
  component: "TinyMceEditor"
}

const Template = (args) => <TinyMceEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
