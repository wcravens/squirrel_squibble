import { useRef, useEffect, useState } from 'react'
import Editor from 'rich-markdown-editor';
import SelectMenu from './selectMenu';
import './editableBlock.css';

// following: https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc

const EditableBlock = (props) => {

    var contentEditable = useRef(null);

    const [state, setState] = useState({
        htmlBackup: null,
        html: "",
        tag: "p",
        previousKey: "",
        selectMenuIsOpen: false,
        selectMenuPosition: {
            x: null,
            y: null
        }
    }
    );

    const getCaretCoordinates = () => {
        let x, y;
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(false);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
        return { x, y };
    };

    // const onKeyUpHandler = (e) => {
    //     if (e.key === "/") {
    //         openSelectMenuHandler();
    //     }
    // }

    const [menuOpen, setMenuOpen] = useState(false);

    const openSelectMenuHandler = () => {
        const { x, y } = getCaretCoordinates();
        setState(prev => {
            return {
                ...prev,
                selectMenuIsOpen: true,
                selectMenuPosition: { x, y }
            }
        })
        setMenuOpen(true);
        document.addEventListener("click", closeSelectMenuHandler);
    }

    const closeSelectMenuHandler = () => {
        setMenuOpen(false);
        setState(prev => {
            return {
                ...prev,
                htmlBackup: null,
                selectMenuIsOpen: false,
                selectMenuPosition: { x: null, y: null }
            }
        })
        document.removeEventListener("click", closeSelectMenuHandler);
    }

    const tagSelectionHandler = (tag) => {
        setState(prev => {
            return {
                ...prev,
                tag: tag,
                html: prev.htmlBackup
            }
        })
        console.log(state);
        // setCaretToEnd(contentEditable.current);
        // closeSelectMenuHandler();
    }


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
        if (e === "/") {
            setState(prev => {
                return {
                    ...prev,
                    // htmlBackup: html
                }
            })
            openSelectMenuHandler();
        }
        if (e === "Enter") {
            if (state.previousKey !== "Shift") {
                e.preventDefault();
                console.log(contentEditable.current);
                props.addBlock({
                    id: props.id,
                    ref: contentEditable.current
                });
            }
        }
        if (e === "Backspace" && state.html == "<br>") {
            e.preventDefault();
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
        onKeyDownHandler("/");
    }

    return (
        <div className='editableBlock'>
            {menuOpen ?
                <SelectMenu
                    position={state.selectMenuPosition}
                    onSelect={tagSelectionHandler}
                    close={closeSelectMenuHandler}
                /> : null}

            <Editor
                onChange={(value) => handleChange(value())}
            />
        </div>
    );
}

export default EditableBlock; 