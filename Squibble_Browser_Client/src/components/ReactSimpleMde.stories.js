import React from 'react';
import ReactSimpleMde from "./ReactSimpleMde";

// Using:  https://www.npmjs.com/package/react-simplemde-editor

export default {
  component: "ReactSimpleMde",
}

const Template = (args) => <ReactSimpleMde {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
