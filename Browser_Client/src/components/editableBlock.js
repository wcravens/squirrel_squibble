import { useRef, useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable';
import SelectMenu from './selectMenu';

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

    const setCaretToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    };

    const handleBlur = () => {
        console.log(contentEditableRef.current.innerHTML);
    }

    const onKeyUpHandler = (e) => {
        if (e.key === "/") {
            openSelectMenuHandler();
        }
    }

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
        setState(prev => {
            return {
                ...prev,
                tag: props.tag,
                html: props.html
            }
        })
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
        if (e.key === "/") {
            setState(prev => {
                return {
                    ...prev,
                    htmlBackup: html
                }
            })
        }
        if (e.key === "Enter") {
            if (state.previousKey !== "Shift") {
                e.preventDefault();
                console.log(contentEditable.current);
                props.addBlock({
                    id: props.id,
                    ref: contentEditable.current
                });
            }
        }
        if (e.key === "Backspace" && state.html == "<br>") {
            e.preventDefault();
            props.deleteBlock({
                id: props.id,
                ref: contentEditable.current
            });
        }
        setState(prev => {
            return {
                ...prev,
                previousKey: e.key
            }
        })
        console.log(state);
    }

    return (
        <>
            {menuOpen ?
                <SelectMenu
                    position={state.selectMenuPosition}
                    onSelect={tagSelectionHandler}
                // close={closeSelectMenuHandler}
                /> : null}

            <ContentEditable
                className="Block"
                innerRef={contentEditable}
                html={state.html}
                tagName={state.tag}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                onKeyUp={onKeyUpHandler}
            />
        </>
    );
}

export default EditableBlock; 