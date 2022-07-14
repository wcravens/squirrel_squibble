import React, {useState} from 'react'

import './Segment.css'
const Segment = ( props ) => {
  const nestedSegments = ( props.scion || [] ).map( seg => { return ( <Segment {...seg} /> ) } )
  const SegmentType = props.type;

  return (
    <SegmentType className={'Segment'}>
      <header>{ props.header }</header>
      <p>{ props.content }</p>
      { nestedSegments }
    </SegmentType>
  )
}

export default Segment
