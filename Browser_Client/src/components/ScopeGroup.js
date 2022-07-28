import { useEffect, useState } from 'react';
import Editor, { base } from 'rich-markdown-editor'
import custom from './theme';
import './ScopeGroup.css'

const ScopeGroup = (props) => {

    const [values, setValues] = useState({
        id: props.id,
        title: props.title,
        content: props.value,
        component: props.component
    })

    useEffect(() => {
        props.handleChange(values);
    }, [values])

    const handleTitle = (e) => {
        setValues(prev => {
            return {
                ...prev,
                title: e.target.value
            }
        })
    }

    const handleContent = (str) => {
        setValues(prev => {
            return {
                ...prev,
                content: str
            }
        })
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
                                style={{ fontWeight: 'bold', fontSize: '28px', border: 'none', fontFamily: 'Times New Roman' }}
                                onChange={handleTitle}
                                value={values.title}
                            />
                        </div>
                    </>
                    : null
            }
            <>
                <div className='scope-group-markdown'>
                    <Editor
                        headingsOffset={1}
                        onChange={(str) => handleContent(str(), props.component)}
                        placeholder="Content goes here..."
                        theme={custom}
                        // defaultValue={values.content}
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                    />
                </div>
            </>
        </div >
    )
}

export default ScopeGroup;