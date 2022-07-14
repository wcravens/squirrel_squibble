import React from 'react'
import './List.css'

const List = ( {items} ) => {
  return (
    <ul>
      { (items || []).map(item => {
        if ( item.type === "List" ) {
          return ( <List {...item}/> )
        }
        return ( <li> { item.content } </li> )
      } ) }
    </ul>
  )
}

export default List
