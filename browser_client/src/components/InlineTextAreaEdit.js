import React from "react";
import _InlineEdit from './_InlineEdit'
import './InlineTextAreaEdit.css'

const InlineTextAreaEdit = ( { defaultValue } ) => {
  const _ = _InlineEdit( defaultValue );
  return (
    <textarea {..._.props} />
  )
}

export default InlineTextAreaEdit;
