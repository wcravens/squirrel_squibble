import React, { useState } from "react";
import './TextAreaEdit.css'

const TextAreaEdit = ({ defaultValue }) => {
  const [ value, setValue ] = useState( '' );
  const [ pure, setPure ]   = useState( true )
  const onFocus   = event => { if (pure) { setValue(''); setPure( false ) } };
  const onChange  = event => setValue( event.target.value );
  const onKeyDown = event => { if ( event.key === "Enter" || event.key === "Escape" ) { event.target.blur(); } };

  return (
    <textarea
      rows={3}
      aria-label = "Field name"
      value = { pure ? defaultValue : value }
      className = { pure ? 'pure' : '' }
      onFocus   = { onFocus }
      onChange  = { onChange }
      onKeyDown = { onKeyDown }
    />
  )
}

export default TextAreaEdit
