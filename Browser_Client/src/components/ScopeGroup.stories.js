import React from 'react';
import ScopeGroup from "./ScopeGroup.js";

// Using:  https://www.npmjs.com/package/react-simplemde-editor

export default {
    component: "ScopeGroup",
}

const Template = (args) => <ScopeGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
