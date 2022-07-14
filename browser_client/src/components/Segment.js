import React, {useState} from 'react'

const Segment = ( props ) => {

  const nestedSegments = ( props.scion || [] ).map( seg => {
    return  <Segment { ...seg } />
  });

  const styles = {
    border: '1px solid blue',
    marginLeft: '10px'
  }

  return (
    <article style={styles}  >
      <pre>{ props.type }</pre>
      <header>{ props.header }</header>
      <p>{ props.content }</p>
      { nestedSegments }
    </article>
  )
}

export default Segment
