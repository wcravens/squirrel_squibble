import React from 'react';
import InlineInputEdit from './InlineInputEdit'

export default {
  component: "InlineInputEdit",
  args: {
    //👇 All Button stories will be primary by default
    defaultValue: "Edit me...",
  },
}

const Template = (args) => <InlineInputEdit {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
