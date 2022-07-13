import React, { useState } from "react";
import './InlineEdit.css'



const InlineEdit = ({defaultValue, type}) => {
  const [ value, setValue ] = useState( '' );
  const [ pure, setPure ] = useState( true )
  const onFocus   = event => { if (pure) { setValue(''); setPure( false ) } };
  const onChange  = event => setValue( event.target.value );
  const onKeyDown = event => { if ( event.key === "Enter" || event.key === "Escape" ) { event.target.blur(); } };

  const Label = ({tag, ...other}) => {
    const component = {tag: tag};

    return (<component.tag {...other} aria-label = "Field name" value = { pure ? defaultValue : value } className = { pure ? 'pure' : '' } onFocus   = { onFocus } onChange  = { onChange } onKeyDown = { onKeyDown }></component.tag>);
  };

  if (type === "input") {
    return (
        <Label tag = {type} type = "text"/>
    );
  } else if (type === "textarea") {
    return (
        <Label tag = {type} rows={3}/>
    );
  }
  
}

export default InlineEdit
