import React, { useState } from "react";
import './InlineEdit.css'

const InlineEdit = ({ defaultValue }) => {
  const [ value, setValue ] = useState( '' );
  const [ pure, setPure ] = useState( true )
  const onFocus   = event => { if (pure) { setValue(''); setPure( false ) }; console.log( event ) };
  const onChange  = event => setValue( event.target.value )
  const onKeyDown = event => { if ( event.key === "Enter" || event.key === "Escape" ) { event.target.blur(); } }

  return (
    <input
      type = "text"
      aria-label = "Field name"
      value = { pure ? defaultValue : value }
      onFocus   = { onFocus }
      onChange  = { onChange }
      onKeyDown = { onKeyDown }
    />
  )
}

export default InlineEdit
