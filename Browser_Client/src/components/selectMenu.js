import { useEffect, useState } from 'react'
import { matchSorter } from 'match-sorter'

const MENU_HEIGHT = 150;
const allowedTags = [
    {
        id: "page-title",
        tag: "h1",
        label: "Page Title"
    },
    {
        id: "heading",
        tag: "h2",
        label: "Heading"
    },
    {
        id: "subheading",
        tag: "h3",
        label: "Subheading"
    },
    {
        id: "paragraph",
        tag: "p",
        label: "Paragraph"
    }
];

const SelectMenu = (props) => {
    const [state, setState] = useState({
        command: "",
        items: allowedTags,
        selectedItem: 0
    });

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    });

    useEffect(() => {
        const items = matchSorter(allowedTags, state.command, { keys: ["tag"] });
        setState(prev => { return { ...prev, items: items } });
    }, [state.command])


    const keyDownHandler = (e) => {
        const items = state.items;
        const selected = state.selectedItem;
        const command = state.command;

        switch (e.key) {
            case "Enter":
                e.preventDefault();
                props.onSelect(items[selected].tag);
                break;
            case "Backspace":
                if (!command) props.close();
                setState(prev => { return { ...prev, command: command.substring(0, command.length - 1) } });
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
                setState(prev => { return { ...prev, selectedItem: prevSelected } });
                break;
            case "ArrowDown":
            case "Tab":
                e.preventDefault();
                const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
                setState(prev => { return { ...prev, selectedItem: nextSelected } });
                break;
            default:
                setState(prev => { return { ...prev, command: state.command + e.key } });
                break;
        }
    }

    const x = props.position.x;
    const y = props.position.y - MENU_HEIGHT;
    const positionAttributes = { top: y, left: x };

    return (
        <div className="SelectMenu" style={positionAttributes}>
            <div className="Items">
                {state.items.map((item, key) => {
                    const selectedItem = state.selectedItem;
                    const isSelected = state.items.indexOf(item) === selectedItem;
                    return (
                        <div
                            className={isSelected ? "Selected" : null}
                            key={key}
                            role="button"
                            tabIndex="0"
                            onClick={() => props.onSelect(item.tag)}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default SelectMenu;