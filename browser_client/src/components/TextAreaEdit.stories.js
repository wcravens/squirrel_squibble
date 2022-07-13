import React from 'react';
import TextAreaEdit from "./TextAreaEdit"

// https://dev.to/emma/how-to-build-an-inline-edit-component-in-react-358p
// Also: https://blog.logrocket.com/building-inline-editable-ui-in-react/

export default {
  component: "TextAreaEdit",
  args: {
    //👇 All Button stories will be primary by default
    defaultValue: "Edit me...",
  },
}

const Template = (args) => <TextAreaEdit {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
