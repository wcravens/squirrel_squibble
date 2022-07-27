import { useState } from "react";
import ScopeGroup from "./ScopeGroup";

const InScope = () => {
    var scope_group = {
        id: Math.random(),
        Title: "",
        Main: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    var scope_group2 = {
        id: Math.random(),
        Title: "",
        Main: "",
        Assumptions: "",
        Constraints: "",
        Risks: "",
    };

    const scope_components = ["Main", "Assumptions", "Constraints", "Risks"];

    const [groups, setGroups] = useState([scope_group, scope_group2]);

    const [editorView, setEditorView] = useState(true);

    const handleView = () => {
        setEditorView(!editorView);
    }

    const handleChange = (values) => {
        const index = groups.map((g) => g.id).indexOf(values.id);
        var newGroups = groups;
        newGroups[index][values.component] = values.content;
        if (values.component === "Main") {
            newGroups[index].Title = values.title;
        }
        setGroups(newGroups);
        console.log(groups);
    }

    return (
        <>
            <button onClick={handleView}> Toggle Editor View </button>
            {editorView ?
                <>
                    <h1>Scope Group Editor</h1>
                    {
                        groups.map((group, key) => (
                            scope_components.map((component, key) => (
                                <>

                                    {component != "Main" ? <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '24px', border: 'none', fontFamily: 'Times New Roman' }}>
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

                        ))
                    }
                </>
                : <>
                    <h1>IA View</h1>
                    {
                        scope_components.map((component, key) => (

                            <>
                                {component != "Main" ? <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '24px', border: 'none', fontFamily: 'Times New Roman' }}>
                                    {component}
                                </div> : null}

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
        </>
    )
}

export default InScope