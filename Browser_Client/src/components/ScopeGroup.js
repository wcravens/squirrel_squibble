import { useEffect, useState } from 'react';
import Editor from 'rich-markdown-editor'
import ScopeObject from './ScopeObject';
import custom from './theme';

/**
 * @param props: id, value, component, handleChange()
 */
const ScopeGroup = (props) => {

    var values = {
        id: props.id,
        content: props.value,
    }

    const handleContent = (str) => {
        if (props.component == "InScope") {
            values.content.Desc = str;
        } else {
            values.content = str;
        }
        props.handleChange(values);
    }

    const handleTitle = (e) => {
        values.content.Title = e.target.value;
        props.handleChange(values);
    }

    const handleObject = (val) => {
        const index = values.content.Objects.map((g) => g.id).indexOf(val.id);
        values.content.Objects[index] = val;

        props.handleChange(values);
    }

    const addObject = () => {
        var scope_object = {
            id: Math.random(),
            title: "",
            content: "- "
        }
        var new_objects = values.content.Objects;
        new_objects.push(scope_object);
        values.content.Objects = new_objects;
        props.handleChange(values);
    }

    return (
        <div className="scope-group">
            {
                props.component == "InScope" ?
                    <>
                        <div className='scope-group-header'>
                            <input
                                type="text"
                                className='scope-group-header'
                                placeholder="Scope Group Header"
                                style={{ fontWeight: 'bold', fontSize: '22px', border: 'none', fontFamily: 'Times New Roman' }}
                                onChange={handleTitle}
                                value={values.content.Title}
                            />
                        </div>
                        <div className='scope-group-markdown'>
                            <Editor
                                headingsOffset={1}
                                onChange={(str) => handleContent(str())}
                                placeholder="Content goes here..."
                                theme={custom}
                                defaultValue={values.content.Desc}
                            />
                        </div>
                        <button onClick={addObject}>Add Object</button>
                        {values.content.Objects.map((obj, key) => (
                            <li>
                                <ScopeObject
                                    object={obj}
                                    handleObject={handleObject}
                                />
                            </li>
                        ))
                        }
                    </>
                    : <>
                        <div className='scope-group-markdown'>
                            <Editor
                                headingsOffset={1}
                                onChange={(str) => handleContent(str())}
                                placeholder="Content goes here..."
                                theme={custom}
                                defaultValue={values.content}
                            />
                        </div>
                    </>
            }
        </div >
    )
}

export default ScopeGroup;