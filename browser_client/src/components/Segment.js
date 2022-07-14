import React, {useState} from 'react'

const Segment = ( props ) => {
  const nestedSegments = ( props.scion || [] ).map( seg => {
    return  <Segment { ...seg } />
  });
  return (
    <article style={ { border: '1px solid blue' } }>
      <pre>{ props.type }</pre>
      <header>{ props.header }</header>
      <p>{ props.content }</p>
      { nestedSegments }
    </article>
  )
}

export default Segment
