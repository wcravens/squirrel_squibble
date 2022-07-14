import React from "react";
import _InlineEdit from './_InlineEdit'
import './InlineTextAreaEdit.css'

const InlineTextAreaEdit = ( { defaultValue } ) => {
  const _ = _InlineEdit( defaultValue );
  const onInput = (e) => {
    if (e.target.scrollHeight > 33) {
      e.target.style.height = "5px";
      e.target.style.height = (e.target.scrollHeight - 16) + "px";
    }
  }
  return (
    <textarea
      rows = {1}
      cols = {82}
      onInput = { onInput }
      {..._.props}
    />
  );
}

export default InlineTextAreaEdit;
