import Editor from 'rich-markdown-editor'
import InlineInputEdit from './InlineInputEdit';
import './ScopeGroup.css'


const ScopeGroup = () => {


    return (
        <div className="scope-group">
            <h1>Scope Group Editor</h1>
            <div className='scope-group-header'>
                <input type="text" style={{ fontWeight: 'bold', fontSize: '28px', border: 'none', fontFamily: 'Times New Roman' }} />
            </div>
            <Editor
                headingsOffset={1}
            />
            <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '28px', border: 'none', fontFamily: 'Times New Roman' }}>
                Assumptions
            </div>
            <Editor
                headingsOffset={1}
            />
            <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '28px', border: 'none', fontFamily: 'Times New Roman' }}>
                Constraints
            </div>
            <Editor
                headingsOffset={1}
            />
            <div className='scope-group-header' style={{ fontWeight: 'bold', fontSize: '28px', border: 'none', fontFamily: 'Times New Roman' }}>
                Risks
            </div>
            <Editor
                headingsOffset={1}
            />
        </div>
    )
}

export default ScopeGroup;