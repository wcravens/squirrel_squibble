import { useState, useEffect, useRef } from 'react'
import EditableBlock from './editableBlock';

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const EditablePage = () => {
    const initialBlock = { id: uid(), html: "Edit Me...", tag: "p", type: "title" };
    const initialBlock2 = { id: uid(), html: "Edit Me...", tag: "p", type: "business_context" };
    const initialBlock3 = { id: uid(), html: "Edit Me...", tag: "p", type: "objectives" };
    const initialBlock4 = { id: uid(), html: "Edit Me...", tag: "p", type: "in_scope" };
    const initialBlock5 = { id: uid(), html: "Edit Me...", tag: "p", type: "scope_block" };

    var focusedBlock = null;

    const [state, setState] = useState({
        blocks: [initialBlock, initialBlock2, initialBlock3, initialBlock4, initialBlock5],
        focus: false
    })

    const updatePageHandler = (updatedBlock) => {
        const blocks = state.blocks;
        const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html
        };

        setState({ blocks: updatedBlocks });
    }

    const addBlockHandler = (currentBlock) => {
        const newBlock = { id: uid(), html: "NEW", tag: "p" };
        const blocks = state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
        console.log(currentBlock.ref);
        focusedBlock = currentBlock.ref;
        setState(prev => { return { blocks: updatedBlocks, focus: !prev.focus } });
    }

    useEffect(() => {
        if (focusedBlock) {
            // focusedBlock.nextElementSibling.focus();
        }
        console.log(focusedBlock)
    }, [state.focus]);


    const deleteBlockHandler = (currentBlock) => {
        const previousBlock = currentBlock.ref.previousElementSibling;
        if (previousBlock) {
            const blocks = state.blocks;
            const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            setState({ blocks: updatedBlocks }, () => {
                previousBlock.focus();
            });
        }
        console.log("delete");
    }

    // setInterval(() => {
    //     console.log(document.activeElement)
    // }, 5000)

    return (
        <div className="Page" >
            {
                state.blocks.map((block, key) => (
                    <EditableBlock
                        key={key}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                        updatePage={updatePageHandler}
                        addBlock={addBlockHandler}
                        deleteBlock={deleteBlockHandler}
                        type={block.type}
                    />
                ))
            }
        </div >
    );

}

export default EditablePage;