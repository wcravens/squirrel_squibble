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

var scope_object = {
    id: Math.random(),
    title: "Object Title",
    content: "- content"
}

var scope_object2 = {
    id: Math.random(),
    title: "",
    content: "- "
}

var scope_group = {
    id: Math.random(),
    InScope: {
        Title: "Scope Group Title",
        Desc: "This is a **markdown** editor",
        Objects: [scope_object]
    },
    Assumptions: "This assumption is tied to the **first scope group**",
    Constraints: "This is to the first as well",
    Risks: "... and so on",
    Dependencies: "The first scope group's dependencies",
};

var scope_group2 = {
    id: Math.random(),
    InScope: {
        Title: "Scope Group Title 2",
        Desc: "",
        Objects: [scope_object2]
    },
    Assumptions: "And this is tied to the **second scope group**",
    Constraints: "And this to the second",
    Risks: "*... on and on*",
    Dependencies: "The second scope group's dependencies",
};

var example_structure = {
    objectives: "",
    background: "",
    in_scope: [scope_group, scope_group2],
    out_of_scope: "",
    separately_specified_scope: "",
}

// const [example_structure, setStructure] = useState({
//     objectives: "- This is the list\n- Of objectives",
//     background: "Paragraph for background",
//     in_scope: [scope_group, scope_group2],
//     out_of_scope: "- Another list\n- With multiple items",
//     separately_specified_scope: "The separately specified scope's contents",
// })

export const Primary = Template.bind({});
Primary.args = {
    structure: example_structure
};
