import { useState } from "react";
import ScopeGroup from "./ScopeGroup";
import Sidebar from "./Sidebar";
import './InScope.css'

const InScope = () => {
    var scope_group = {
        id: Math.random(),
        Title: "Title 1",
        InScope: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    var scope_group2 = {
        id: Math.random(),
        Title: "Title 2",
        InScope: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    var scope_group3 = {
        id: Math.random(),
        Title: "Title 3",
        InScope: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    var scope_group4 = {
        id: Math.random(),
        Title: "Title 4",
        InScope: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    const scope_components = ["InScope", "Assumptions", "Constraints", "Risks"];

    const [groups, setGroups] = useState([scope_group, scope_group2, scope_group3, scope_group4]);

    const [editorView, setEditorView] = useState(true);

    const handleView = () => {
        setEditorView(!editorView);
    }

    const handleChange = (values) => {
        const index = groups.map((g) => g.id).indexOf(values.id);
        var newGroups = groups;
        newGroups[index][values.component] = values.content;
        if (values.component === "InScope") {
            newGroups[index].Title = values.title;
        }
        setGroups(newGroups);
        console.log(groups);
    }

    return (
        <div id="outer-container">
            {editorView ? <Sidebar groups={groups} /> : null}
            <button onClick={handleView}> Toggle View </button>

            {editorView ?
                <div id="page-wrapper">
                    <h1>Scope Group Editor</h1>
                    {
                        groups.map((group, key) => (
                            <div id={group.Title}>
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
                    <h1>IA View</h1>
                    {
                        scope_components.map((component, key) => (

                            <>
                                <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '24px', border: 'none', fontFamily: 'Times New Roman' }}>
                                    {component != "InScope" ? component : "In-Scope"}
                                </div>
                                {
                                    groups.map((group, key) => (
                                        <li>
                                            <ScopeGroup
                                                title={group.Title}
                                                value={group[component]}
                                                id={group.id}
                                                handleChange={handleChange}
                                                component={component}
                                            />
                                        </li>
                                    ))
                                }
                            </>
                        ))
                    }
                </>
            }
        </div>

    )
}

export default InScope