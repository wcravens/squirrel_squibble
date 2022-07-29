

console.log( `Executed at ${ new Date().toISOString() }` )

const findOptimum = arr => Math.max( ...arr )
const array = [22, 9, 60, 12, 4, 56]
console.log( findOptimum( array ) )
