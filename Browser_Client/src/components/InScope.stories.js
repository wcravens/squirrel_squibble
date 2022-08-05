import React from 'react';
import InScope from "./InScope";

// Using:  https://www.npmjs.com/package/react-simplemde-editor
import { useState } from 'react';


export default {
    component: "InScope",
}

const Template = (args) => <InScope {...args} />;

const lorem_ipsum = "Lorem ipsum dolor sit amet";

const setStructure = (val) => {

}

export const Primary = Template.bind({});
Primary.args = {
    scopeGroups: [{
        id: Math.random(),
        Title: "This Is an Editable Title",
        InScope: "This is a **markdown** editor",
        Assumptions: lorem_ipsum,
        Constraints: lorem_ipsum,
        Risks: lorem_ipsum,
        Dependencies: lorem_ipsum,
    }],
    editorView: true,
    setStructure: setStructure,
};
