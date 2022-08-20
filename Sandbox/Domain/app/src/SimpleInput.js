import React, { useState } from 'react';


const SimpleInput = (props) => {

  const [ message, setMessage ] = useState('');

  const handleChange = _ => {
    setMessage( _.target.value );
    console.log( message );
  };

  return (
    <input placeholder="Footastic..." onChange={ handleChange } value={message} id={props.id}/>
  )
};


export default SimpleInput;
