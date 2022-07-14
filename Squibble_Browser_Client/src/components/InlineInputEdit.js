import React from "react";
import _InlineEdit from './_InlineEdit'

const InlineInputEdit = ( { defaultValue } ) => {
  const _ = _InlineEdit( defaultValue );
  return (
    <input type="text" {..._.props} />
  )
}

export default InlineInputEdit;
