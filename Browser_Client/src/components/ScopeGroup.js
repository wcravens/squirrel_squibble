import { useEffect, useState } from 'react';
import Editor, { base } from 'rich-markdown-editor'
import custom from './theme';

const ScopeGroup = (props) => {

    const [values, setValues] = useState({
        id: props.id,
        title: props.title,
        content: props.value,
        component: props.component
    })

    const [focused, setFocus] = useState(false);

    useEffect(() => {
        props.handleChange(values);
        console.log("Changed");
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

    const handleFocus = () => {
        setFocus(true);
    }

    const handleBlur = () => {
        setFocus(false);
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
                        defaultValue={values.content}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
            </>
        </div >
    )
}

export default ScopeGroup;