import redux from '@reduxjs/toolkit'

const Properties =  Object.getOwnPropertyNames( redux );
const Methods = Properties.filter( _ => typeof redux[_] === 'function' )
console.log( Methods )