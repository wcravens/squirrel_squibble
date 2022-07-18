import React from 'react';
import EditablePage from './editablePage';

export default {
    component: "EditableBlock",
    args: {
        //👇 All Button stories will be primary by default
        defaultValue: "Edit me...",
    },
}

const Template = (args) => <EditablePage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
