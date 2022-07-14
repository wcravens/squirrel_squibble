import React from "react";
import List from './List'

export default {
  component: "List",
}

const Template = (args) => <List {...args} />;

export const Primary = Template.bind({});
Primary.args =
  {
    type: 'List',
    items: [
      {
        type: 'ListItem',
        content: 'Item 1'
      },
      {
        type: "ListItem",
        content: 'Item 2',
      },
      {
        type: 'List',
        items: [
          {
            type: "ListItem",
            content: 'Item 2.1',
          },
          {
            type: "ListItem",
            content: 'Item 2.b',
          },
        ]
      },
      {
        type: "ListItem",
        content: 'Item 3',
      },
    ]
  }
;
