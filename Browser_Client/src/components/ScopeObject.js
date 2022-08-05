import Editor from 'rich-markdown-editor'
import custom from './theme';

// object structure
// var scope_object = {
//     id: Math.random(),
//     title: "",
//     content: ""
// }


/**
 * @param props: object, handleObject()
 */
const ScopeObject = (props) => {

    var obj = {
        id: props.object.id,
        title: props.object.title,
        content: props.object.content
    }

    const handleUpdate = (str, type) => {
        if (type == "title") {
            obj.title = str;
        } else {
            obj.content = str;
        }
        props.handleObject(obj);
    }

    return (
        <>
            <Editor
                headingsOffset={2}
                onChange={(str) => handleUpdate(str(), "title")}
                placeholder="Content goes here..."
                theme={custom}
                defaultValue={obj.title}
            />
            <Editor
                headingsOffset={2}
                onChange={(str) => handleUpdate(str(), "content")}
                placeholder="Content goes here..."
                theme={custom}
                defaultValue={obj.content}
            />
        </>
    )


}

export default ScopeObject