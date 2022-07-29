console.log( `Executed at ${ new Date().toISOString() }` )

const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args)
const pipeline = ( ...fns ) =>
  fns.reduce( ( result, f ) => (...args) => f(result(...args)))
const compose = (...fns) => pipeline(...(fns.reverse()));
const tap =  fn => args  => ( fn(args), args )
const tee = tap( console.log )

const removeNonAlpha = str => str.replace(/[^a-z]/gi, " ");
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = str => str.trim().split(/\s+/);
const arrayToSet = arr => new Set(arr);
const setToList = set => Array.from(set).sort();

const testOdd = x => x % 2 === 1;
const testUnderFifty = x => x < 50;
const double = x => x + x;
const addThree = x => x + 3;

const mapTR = fn => reducer => (accum, value) => reducer(accum, fn(value));
const filterTR = fn => reducer => (accum, value) => fn(value) ? reducer(accum, value) : accum;

const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const doubleR = mapTR(double);
const addThreeR = mapTR(addThree);

const addToArray = (a, v) => {
  a.push(v);
  return a;
};

const myArray = [22, 9, 60, 24, 11, 63];

const a0 = myArray
  .filter(testOdd)
  .map(double)
  .filter(testUnderFifty)
  .map(addThree);
console.log( a0 )

const a1 = myArray.reduce( testOddR(doubleR(testUnderFiftyR(addThreeR(addToArray)))), [] )
console.log( a1 )

const makeReducer = ( arr, fns, reducer = addToArray, initial = [] ) =>
  arr.reduce( compose( ...fns )(reducer), initial );
const a2 = makeReducer( myArray, [ testOddR, doubleR, testUnderFiftyR, addThreeR ] );

console.log( a2 )

const sum = makeReducer( myArray, [ testOddR, doubleR, testUnderFiftyR, addThreeR ], (acc, value) => acc + value, 0 );
console.log( sum )
