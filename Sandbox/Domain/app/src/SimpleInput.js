import React, { useState } from 'react';


const SimpleInput = () => {

  const [ message, setMessage ] = useState('');

  const handleChange = _ => {
    setMessage( _.target.value );
    console.log( _.target.value );
  };

  return (
    <input placeholder="Footastic..." onChange={ handleChange } value={message} />
  )
};


export default SimpleInput;
