import React, { useState } from "react";
import './_InlineEdit.css'

const _InlineEdit = ( defaultValue ) => {
  const [ value, setValue ] = useState( '' );
  const [ pure, setPure ]   = useState( true );
  const _onFocus   = () => { if (pure) { setValue(''); setPure( false ) } };
  const _onChange  = event => setValue( event.target.value );
  const _onKeyDown = event => {
    if ( ( event.key === "Enter" && !event.shiftKey ) || event.key === "Escape" ) {
      event.target.blur();
    }
  };
  const _onBlur   = event => {
    if (event.target.value.trim() === "") {
      setPure(true);
    } else {
      setValue(event.target.value);
    }
  }

  const _pureValue = () => { return pure ? defaultValue : value };
  const _pureClass = () => { return pure ? 'pure' : '' };
  const _ = {
    pure: pure,
    props: {
      "aria-label": "Field name",
      "cols": 82,
      "value":      _pureValue(),
      "className":  'InlineEdit ' + _pureClass(),
      "onFocus":    _onFocus,
      "onChange":   _onChange,
      "onKeyDown":  _onKeyDown,
      "onBlur":     _onBlur
    }
  }
  return _
}

export default _InlineEdit
