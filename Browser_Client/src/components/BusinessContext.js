import { useState } from 'react';
import Editor from 'rich-markdown-editor'
import InScope from './InScope';
import ScopeGroup from './ScopeGroup';
import custom from './theme';
import Sidebar from './Sidebar';

const proper_components = { objectives: "Objectives", background: "Background", in_scope: "In Scope", out_of_scope: "Out Of Scope", separately_specified_scope: "Separately Specified Scope" };
const components = ["objectives", "background", "in_scope", "out_of_scope", "separately_specified_scope"];
const components_wo_in = ["objectives", "background", "out_of_scope", "separately_specified_scope"];
const decision_components = ["Assumptions", "Constraints", "Risks", "Dependencies"];

var scope_group = {
    id: Math.random(),
    Title: "This Is an Editable Title",
    InScope: "This is a **markdown** editor\n - and a list\n - and another point",
    Assumptions: "This assumption is tied to the **first scope group**",
    Constraints: "This is to the first as well",
    Risks: "... and so on",
    Dependencies: "The first scope group's dependencies",
};

var scope_group2 = {
    id: Math.random(),
    Title: "This is also a title",
    InScope: "- this describes the group\n - and various factors \n\t - and can be nested",
    Assumptions: "And this is tied to the **second scope group**",
    Constraints: "And this to the second",
    Risks: "*... on and on*",
    Dependencies: "The second scope group's dependencies",
};

const BusinessContext = () => {

    const [example_structure, setStructure] = useState({
        objectives: "- This is the list\n- Of objectives",
        background: "Paragraph for background",
        in_scope: [scope_group, scope_group2],
        out_of_scope: "- Another list\n- With multiple items",
        separately_specified_scope: "The separately specified scope's contents",
    })

    const [editorView, setEditorView] = useState(false);

    const handleView = () => {
        setEditorView(!editorView);
    }

    const handlePrint = () => {
        var str = "# Business Context\n## Objectives\n";
        str += example_structure.objectives + "\n## Background\n";
        str += example_structure.background + "\n## In Scope\n"
        example_structure.in_scope.map((scope) => (
            str += "### " + scope.Title + "\n" + scope.InScope + ""
        ));
        str += "## Out Of Scope\n" + example_structure.out_of_scope + "\n## Separately Specified Scope\n";
        str += example_structure.separately_specified_scope + "\n\n";
        str += "# Decision Factors\n## Assumptions\n";
        example_structure.in_scope.map((scope) => (
            str += "- " + scope.Assumptions + "\n"
        ));
        str += "## Constraints\n";
        example_structure.in_scope.map((scope) => (
            str += "- " + scope.Constraints + "\n"
        ));
        str += "## Risks\n";
        example_structure.in_scope.map((scope) => (
            str += "- " + scope.Risks + "\n"
        ));
        str += "## Dependencies\n";
        example_structure.in_scope.map((scope) => (
            str += "- " + scope.Dependencies + "\n"
        ));
        console.log(str);
    }

    const handleChange = (values) => {
        const index = example_structure[components[2]].map((g) => g.id).indexOf(values.id);

        var new_in_scope = example_structure[components[2]];
        new_in_scope[index].Title = values.title;
        new_in_scope[index][values.component] = values.content;
        setStructure(prev => {
            return {
                ...prev,
                in_scope: new_in_scope
            }
        })
    }

    const handleContent = (str, component) => {
        example_structure[component] = str;
    }

    const handleAdd = () => {
        var new_scope_group = {
            id: Math.random(),
            Title: "",
            InScope: "",
            Assumptions: "",
            Constraints: "",
            Risks: "",
            Dependencies: "",
        };
        setStructure(prev => {
            return {
                ...prev,
                in_scope: [...prev[components[2]], new_scope_group]
            }
        })
    }

    return (
        <div id="page-wrapper">
            {editorView ? <Sidebar titles={example_structure[components[2]]} groups={components_wo_in} proper={proper_components} isEditor={true} /> : <Sidebar groups={components} proper={proper_components} decisions={decision_components} isEditor={false} />}
            <button onClick={handleAdd}> Add Scope Group </button>
            <button onClick={handleView}> Toggle IA/Scope View </button>
            <button onClick={handlePrint}> Log Contents </button>
            <h1 id='business-context'>Business Context</h1>
            {<>
                {components.map((component, key) => (
                    <div id={component} className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '16px', border: 'none', fontFamily: 'Times New Roman' }}>

                        {component != "in_scope" ?
                            <>
                                <h2>{proper_components[component]}</h2>
                                <Editor
                                    headingsOffset={2}
                                    onChange={(str) => handleContent(str(), component)}
                                    placeholder="Content goes here..."
                                    theme={custom}
                                    defaultValue={example_structure[component]}
                                />
                            </>
                            :
                            !editorView ? <>  <h2>{proper_components[component]}</h2>
                                {
                                    example_structure[component].map((scope, key) => (
                                        <>
                                            <ScopeGroup
                                                title={scope.Title}
                                                value={scope.InScope}
                                                id={scope.id}
                                                handleChange={handleChange}
                                                component="InScope"
                                            />
                                        </>
                                    ))}
                            </>
                                : null
                        }
                    </div>
                ))}
                <h1 id='decision-factors'>Decision Factors</h1>
                <InScope
                    scopeGroups={example_structure[components[2]]}
                    setStructure={setStructure}
                    editorView={editorView}
                    handleAdd={handleAdd}
                    handleChange={handleChange}
                />
            </>
            }


        </div >
    )
}

export default BusinessContext;