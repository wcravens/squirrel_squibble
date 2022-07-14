import React from 'react';
import Segment from './Segment'
import Doc from '../fixtures/Example_Document_Outline'

export default {
  component: "Segment",
}

const Template = (args) => <Segment {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: Doc.type,
  header: Doc.header,
  content: Doc.content,
  scion: Doc.scion
}
