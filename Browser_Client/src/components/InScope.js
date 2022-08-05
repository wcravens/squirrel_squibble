import ScopeGroup from "./ScopeGroup";
import './InScope.css'

// Scope Group Structure
// var scope_group = {
//     id: Math.random(),
//     InScope: {
//         Title: "Scope Group Title",
//         Desc: "This is a **markdown** editor",
//         Objects: [scope_object]
//     },
//     Assumptions: "This assumption is tied to the **first scope group**",
//     Constraints: "This is to the first as well",
//     Risks: "... and so on",
//     Dependencies: "The first scope group's dependencies",
// };

/**
 * @param props: scopeGroups, editorView, setStructure(), handleAdd(), handleChange()
 */
const InScope = (props) => {
    const scope_components = ["InScope", "Constraints", "Assumptions", "Risks", "Dependencies"];
    const decision_components = ["Constraints", "Assumptions", "Risks", "Dependencies"];

    const handleChange = (values) => {
        const index = props.scopeGroups.map((g) => g.id).indexOf(values.id);
        var newGroups = props.scopeGroups;

        newGroups[index][values.component] = values.content;

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
                                                <h2> {component}</h2>
                                            </div> : null}
                                            <ScopeGroup
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