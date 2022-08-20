import React from 'react';
import SimpleInput from "./SimpleInput";
import { nanoid } from '@reduxjs/toolkit'

const Hello = () => (
  <div>
    <h2>Hello World From React-Rollup</h2>
    <SimpleInput id={nanoid()}/>
  </div>
);
export default Hello;
