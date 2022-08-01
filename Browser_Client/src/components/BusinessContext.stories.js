import React from 'react';
import BusinessContext from "./BusinessContext.js"

// https://dev.to/emma/how-to-build-an-inline-edit-component-in-react-358p
// Also: https://blog.logrocket.com/building-inline-editable-ui-in-react/

export default {
    component: "BusinessContext",
    args: {
        //👇 All Button stories will be primary by default
        defaultValue: "Edit me...",
    },
}

const Template = (args) => <BusinessContext {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    defaultValue: "Edit me..."
};
