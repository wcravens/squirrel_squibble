import { useRef, useEffect, useState } from 'react'
import Editor from 'rich-markdown-editor';
import SelectMenu from './selectMenu';
import './editableBlock.css';

// following: https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc

const SectionTypes = {
    title: "# Title - IA \n Content",
    business_context: "## Business Context",
    objectives: "### Objectives \n - Objective 1",
    background: "### Background \n Content...",
    in_scope: "### In-Scope: ",
    scope_block: "#### Scope Group \n - Content 1... ",
}

const EditableBlock = (props) => {

    var contentEditable = useRef(null);

    const [state, setState] = useState({
        htmlBackup: null,
        html: SectionTypes[props.type],
        tag: "p",
        previousKey: "",
        selectMenuIsOpen: false,
        selectMenuPosition: {
            x: null,
            y: null
        }
    }
    );

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // setState(prev => {
        //     return {
        //         ...prev,
        //         tag: props.tag,
        //         html: props.html
        //     }
        // })
        // document.addEventListener('keydown', onKeyDownHandler);
    })

    useEffect(() => {
        props.updatePage({
            id: props.id,
            html: state.html,
            tag: state.tag
        });
    }, [state.html, state.tag])


    const onChangeHandler = (e) => {
        state.html = e.target.value;
    }

    const onKeyDownHandler = (e) => {
        if (e === "\n") {
            if (state.previousKey !== "Shift") {
                // e.preventDefault();
                console.log(contentEditable.current);
                props.addBlock({
                    id: props.id,
                    ref: contentEditable.current
                });
                // document.getElementById(props.id).nextElementSibling.focus();
                // console.log();
            }
        }
        if (e === "Backspace" && state.html == "<br>") {
            // e.preventDefault();
            props.deleteBlock({
                id: props.id,
                ref: contentEditable.current
            });
        }
        setState(prev => {
            return {
                ...prev,
                previousKey: e
            }
        })
        console.log(state);
    }

    const handleChange = (e) => {
        // onKeyDownHandler(e.slice(-1));
    }

    return (
        <Editor
            className='editableBlock'
            id={props.id}
            defaultValue={state.html}
            onChange={(value) => handleChange(value())}
            ref={contentEditable}
            placeholder="New Section..."
        />
    );
}

export default EditableBlock; 