import { useState } from "react";
import ScopeGroup from "./ScopeGroup";
import Sidebar from "./Sidebar";
import './InScope.css'

const InScope = (props) => {
    const scope_components = ["InScope", "Assumptions", "Constraints", "Risks", "Dependencies"];
    const decision_components = ["Assumptions", "Constraints", "Risks", "Dependencies"];

    // const [groups, setGroups] = useState([scope_group, scope_group2, scope_group3, scope_group4]);
    // const [groups, setGroups] = useState(props.scopeGroups);

    const handleChange = (values) => {

        const index = props.scopeGroups.map((g) => g.id).indexOf(values.id);
        var newGroups = props.scopeGroups;
        newGroups[index][values.component] = values.content;
        if (values.component === "InScope") {
            newGroups[index].Title = values.title;
        }
        props.setStructure(prev => {
            return {
                ...prev,
                in_scope: newGroups,
            }
        })
        // props.handleChange(values);
        // console.log(groups);
    }

    return (
        <div id="outer-container">


            {props.editorView ?
                <div id="page-wrapper">

                    <h1>Scope Group Editor</h1>
                    {
                        props.scopeGroups.map((group, key) => (
                            <div id={group.id}>
                                {
                                    scope_components.map((component, key) => (
                                        <>
                                            {component != "InScope" ? <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '24px', border: 'none', fontFamily: 'Times New Roman' }}>
                                                {component}
                                            </div> : null}
                                            <ScopeGroup
                                                title={group.Title}
                                                value={group[component]}
                                                id={group.id}
                                                handleChange={handleChange}
                                                component={component}
                                            />
                                        </>
                                    ))
                                }
                                <br /><br />
                            </div>
                        ))

                    }

                </div>
                : <>
                    {/* <h1>IA View</h1> */}
                    {
                        decision_components.map((component, key) => (
                            <div id={component}>
                                <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '16px', border: 'none', fontFamily: 'Times New Roman' }}>
                                    <h2>{component}</h2>
                                </div>
                                {
                                    props.scopeGroups.map((group, key) => (
                                        <>
                                            {
                                                group[component] != "" ?
                                                    <li>
                                                        <ScopeGroup
                                                            title={group.Title}
                                                            value={group[component]}
                                                            id={group.id}
                                                            handleChange={handleChange}
                                                            component={component}
                                                        />
                                                    </li>
                                                    : null
                                            }
                                        </>
                                    ))
                                }
                            </div>
                        ))
                    }
                </>
            }
        </div>

    )
}

export default InScope