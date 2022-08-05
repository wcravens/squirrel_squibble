import { useState } from "react";
import ScopeGroup from "./ScopeGroup";
import Sidebar from "./Sidebar";
import './InScope.css'

const InScope = (props) => {
    const scope_components = ["InScope", "Constraints", "Assumptions", "Risks", "Dependencies"];
    const decision_components = ["Constraints", "Assumptions", "Risks", "Dependencies"];

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
    }

    return (
        <div>
            {props.editorView ?
                <div>
                    {
                        props.scopeGroups.map((group, key) => (
                            <div id={group.id}>
                                {
                                    scope_components.map((component, key) => (
                                        <>
                                            {component != "InScope" ? <div className='scope-group-header'>
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
                            </div>
                        ))
                    }
                </div>
                : <>
                    { // IA View
                        decision_components.map((component, key) => (
                            <div id={component}>
                                <div className='scope-group-header'>
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
        </div >
    )
}

export default InScope