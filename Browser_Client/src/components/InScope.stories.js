import React from 'react';
import InScope from "./InScope";

// Using:  https://www.npmjs.com/package/react-simplemde-editor

export default {
    component: "InScope",
}

const Template = (args) => <InScope {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
