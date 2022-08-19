import { useState } from 'react';
import Editor from 'rich-markdown-editor'
import InScope from './InScope';
import ScopeGroup from './ScopeGroup';
import custom from './theme';
import Sidebar from './Sidebar';

// example structure
// var example_structure = {
//     objectives: "",
//     background: "",
//     in_scope: [scope_group, scope_group2],
//     out_of_scope: "",
//     separately_specified_scope: "",
// }

const proper_components = { objectives: "Objectives", background: "Background", in_scope: "In-Scope", out_of_scope: "Out-of-Scope", separately_specified_scope: "Separately Specified Scope" };
const components = ["objectives", "background", "in_scope", "out_of_scope", "separately_specified_scope"];
const components_wo_in = ["objectives", "background", "out_of_scope", "separately_specified_scope"];
const decision_components = ["Assumptions", "Constraints", "Risks", "Dependencies"];

/**
 * @param props: structure
 */
const BusinessContext = (props) => {

    const [example_structure, setStructure] = useState(props.structure);

    const [editorView, setEditorView] = useState(false);

    const handleView = () => {
        setEditorView(!editorView);
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
            InScope: {
                Title: "",
                Desc: "",
                Objects: []
            },
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

            <h1 id='business-context'>Business Context</h1>
            {<>
                {components.map((component, key) => (
                    <div id={component} className='scope-group-header'>
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
                            !editorView ? <>
                                <h2>{proper_components[component]}</h2>
                                {
                                    example_structure[component].map((scope, key) => (
                                        <>
                                            <ScopeGroup
                                                value={scope.InScope}
                                                id={scope.id}
                                                handleChange={handleChange}
                                                component="InScope"
                                            />
                                        </>
                                    ))
                                }
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