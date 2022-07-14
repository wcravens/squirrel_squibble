import React, {useState} from 'react'
import List from './List'

import './Segment.css'
const Segment = ( props ) => {
  const nestedSegments = ( props.scion || [] ).map( seg => { return ( <Segment {...seg} /> ) } )
  const SegmentType = props.type;
  if ( SegmentType === 'List' ) {
    return <List {...props}/>
  }
  return (
    <SegmentType className={'Segment'}>
      <header>{ props.header }</header>
      <p>{ props.content }</p>
      { nestedSegments }
    </SegmentType>
  )
}

export default Segment
