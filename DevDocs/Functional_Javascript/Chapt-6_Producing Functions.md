# Chapter 6 - Producing Functions - Higher Order Functions

In Chapt 5 we looked at several pre-defined *Higher Order Functions* (and methods) that are provided in JavaScript. We
explored how using these functions in a functional programming style we can write more declarative code that is cleaner
and easier to understand. Now let's look at how we can write our own higher order functions to achieve the same
throughout our code.

We can roughly classify the kinds of results that we are going to get into three groups:

***Wrapped functions***: These keep their original functionality while adding some kind of new feature. In this group,
we can consider **logging** (adding log production capacity to any function), **timing** (producing time and performance
data for a given function), and **memoization** (this caches results to avoid future rework). 

***Altered functions***: These differ in some key points from their original versions. Here, we can include the `once()`
function, which changes the original function so that it only runs once, functions such as `not()` or `invert()`, which
alter what the function returns, and *arity-related* conversions, which produce a new function with a fixed number of
parameters.

***Other productions***: These provide new operations, turn functions into promises, allow enhanced search functions, or
decouple methods from objects so that we can use them in other contexts as if they were common functions. We shall leave
a special case – *transducers* – for Chapter 8, Connecting Functions – Pipelining and Composition.

## Wrapping Functions Keeping Behavior

Wrapping functions are implementations of the *decorator* design pattern.  We add some functionality but without
altering the original functionality.

In this section, we'll look at three examples:

- Adding logging to a function
- Getting timing information from functions
- Using caching (memoizing) to improve the performance of functions

### Logging in a Functional Way

Modifying functions or including conditional logging disrupts both the purity of our functions and the single
responsibility of our functions. So let's consider how to 'log from the outside'.

Here, we can write a higher-order function that will have a single parameter – the original function – and return a new
function that will do the following, in sequence:

1. Log the received arguments
2. Call the original function, catching its returned value
3. Log that value
4. Return it to the caller

```js
const array = [22, 9, 60, 12, 4, 56]
const sum = arr => arr.reduce( ( x, y ) => x + y )
const addLogging = fn => (...args) => {
  console.log( `entering ${fn.name}: ${args}` );
  const valueToReturn = fn(...args);
  console.log( `exiting ${fn.name}: ${valueToReturn}` );
  return valueToReturn;
};

const loggedSum = addLogging( sum )
loggedSum( array )
```

### Taking Exceptions Into Account

Just wrap in try/catch.

```js
const addLogging = fn => (...args) => {
  console.log( `entering ${fn.name}: ${args}` );
  try {
    const valueToReturn = fn(...args);
    console.log( `exiting ${fn.name}: ${valueToReturn}` );
    return valueToReturn;
  } catch (thrownError) {
    console.log( `exiting ${fn.name}: threw ${thrownError}` )
    throw( thrownError )
  }
};
```

### Working in a Purer Way

Our previous implementation/s both introduced impure functionality by including `console.log()`.  This we not only
lose flexibility (how do we use an alternate logging solution), but we also complicated our testing.  We could 'spy' on
`console.log()` but that's getting messy (we start depending on the internals of our function rather than simply 
'black-box-testing' ).  

The logging function should be passed as an argument to the wrapper function so that we can change it if we need to:

```js
const addLogging = (fn, logger = console.log) => (...args) => {
  logger(`entering ${fn.name}: ${args}`);
  try {
    const valueToReturn = fn(...args);
    logger(`exiting ${fn.name}: ${valueToReturn}`);
    return valueToReturn;
  } catch (thrownError) {
    logger(`exiting ${fn.name}: threw ${thrownError}`);
    throw thrownError;
  }
};
```

With this methodology we can also inject a dummy function and then spy on it for testing.  Refer to the book for
and example of building stubs for this technique.

### Timing Functions

[ See performance.now() @ MDN ](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)

```js
const myPut = (text, name, tStart, tEnd) =>
 console.log(`${name} - ${text} ${tEnd - tStart} ms`);
const myGet = () => performance.now();

const addTiming = (fn, getTime = myGet, output = myPut) => (...args) => {
   let tStart = getTime();
   try {
     const valueToReturn = fn(...args);
     output("normal exit", fn.name, tStart, getTime());
     return valueToReturn;
   } catch (thrownError) {
     output("exception thrown", fn.name, tStart, getTime());
     throw thrownError;
   }
};
```

### Memoizing Functions

```js
function fib(n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

const memoize = fn => {
  let cache = {};
  return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

/* Generic naive method with exponential growth
const testFib = n => fib(n);
addTiming(testFib)(35);
addTiming(testFib)(40);
addTiming(testFib)(45);
*/

/* The second call to (40) is much shorter, but the rest are still exponential.
const testMemoFib = memoize(n => fib(n));
addTiming(testMemoFib)(35);
addTiming(testMemoFib)(40);
addTiming(testMemoFib)(40);
addTiming(testMemoFib)(45);
*/

fib = memoize( fib )
addTiming(fib)(35);
addTiming(fib)(40);
addTiming(fib)(45);
```

### Memoizing more Complicated Functions - Multiple Arguments

See the book if you need to... most likely you'll just use a memoization library.


## Altering a Functions Behavior

Modify what functions do so that the new results will differ from the original function's ones.

We'll be covering the following topics:

- Revisiting the problem of having a function work, but just once
- Negating or inverting a function's result
- Changing the arity of a function


### Doing things once revisited

You can simply use a type of memoization to store the result from calling a function the first time and just return that
on subsequent calls.

### Logically Inverting a Function

Write a higher-order function that will take any predicate, evaluate it, and then negate its result.

```js
const not = fn => (...args) => !fn(...args)
```

### Inverting Results

```js
const invert = fn => (...args) => -fn(...args);
const spanishAlphaSort = ( a, b ) => a.localeCompare( b, "es" )
const palabras = Object.freeze( ["ñandú", "oasis", "mano", "natural", "mítico", "musical"] )
console.log( palabras.slice().sort( spanishAlphaSort ) )
console.log( palabras.slice().sort( invert( spanishAlphaSort ) ) )
```

### Arity Changing

What we need is a function that will take another function as a parameter and turn it into a unary function. Using
JavaScript's spread operator and an arrow function, this is easy to manage:

```js
const unary = fn => (...args) => fn(args[0]);
console.log( ["123.45", "-67.8", "90"].map( unary( parseInt ) ) )
```

More generically with a generalized helper function:

```js
const arity = (fn, n) => (...args) => fn(...args.slice(0, n));
const unary = fn => arity(fn, 1);
const binary = fn => arity(fn, 2);
const ternary = fn => arity(fn, 3);
console.log( ["123.45", "-67.8", "90"].map( unary( parseInt ) ) )
```

## Changing Function in Other Ways

Let's end this chapter by considering some other sundry functions that provide results such as new finders, decoupling
methods from objects, and more. Our examples will include the following:

- Turning operations (such as adding with the + operator) into functions.
- Turning functions into promises.
- Accessing objects to get the value of a property.
- Turning methods into functions.
- A better way of finding optimum values.

### Turning Operations into Functions

We have already seen several cases in which we needed to write a function just to add or multiply a pair of numbers.

We could turn a binary operator into a function that takes a list of arguments.

```js
const mySum = myArray.reduce((x, y) => x + y, 0);
// Becomes:
const mySum = myArray.reduce(binaryOp("+"), 0);

const factorialByRange = n => range(1, n + 1).reduce((x, y) => x * y, 1);
// Becomes:
const factorialByRange = n => range(1, n + 1).reduce(binaryOp("*"), 1);
```

Certainly seems clearer... but we haven't seen how to implement `binaryOp()`.

### Implementing Operations

Safe and long version:
```js
const binaryOp = op => {
  switch (op) {
    case "+":
      return (x, y) => x + y;
    case "-":
      return (x, y) => x - y;
    case "*":
      return (x, y) => x * y;
  }
};
console.log( binaryOp('+')(2,4) )
console.log( binaryOp('-')(2,4) )
console.log( binaryOp('*')(2,4) )
```

You could also use a shorter version that uses `eval` to build a function out of the operator submitted via the `op`
argument.  But that is simply not acceptable.  ***Very Bad Author for even demonstrating that option!!!***

Depending on personal style preferences a dispatch table make be clearer than a `switch/case` statement.

```js
const binaryOp = op => {
  const dispatch = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y
  }
  return dispatch[op]
};
console.log( binaryOp('+')(2,4) )
console.log( binaryOp('-')(2,4) )
console.log( binaryOp('*')(2,4) )
```

### A Handier Implementation

Doing FP doesn't mean always getting down to the very basic, simplest possible functions.

Currying to provide binary operator functions that pre-specify one or other of the arguments (left or right)

```js
const binaryOp = op => new Function("x", "y", `return x ${op} y;`);
const binaryLeftOp = (x, op)  => y => binaryOp(op)(x,y);
const binaryOpRight = (op, y) => x => binaryOp(op)(x,y);
const isNegative1 = binaryLeftOp(0, ">");
const isNegative2 = binaryOpRight("<", 0);
``` 

Of course, for a simple function such as checking whether a number is negative, I would never want to complicate things
with *currying*, *binary operators*, *pointfree style*, or anything else, and I'd just write the following with no
further ado:

```js
const isNegative = x => x < 0;
```

### Turning Functions into Promises

Simply...

```js
const promisify = fn => (...args) =>
 new Promise( (resolve, reject) =>
   fn(...args, (err, data) => (err ? reject(err) : resolve(data) ) )
);
```

### Getting a Property from an Object

A higher-order function that will receive the name of an attribute and produce a new function that will be able to
extract an attribute from an object.

Using the arrow function syntax, this function is easy to write:
```js
const getProperty = prop => obj => obj[prop];
```

### Demethodizing - Turning methods into functions

Methods such as `filter()` and `map()` are only available on `Array` objects via the `Array.proptotype`.  Also our own
functions such as `none()` that we have implemented cannot be used is the same way as it's 'peer' functions `some()` and
`every()`, which are again part of the `Array.prototype` unless we hack the `Array.prototype` which is ill-advised and
discouraged.

We will turn the existing methods into functions. We can do this if we convert each method into a function that will
receive, as its first parameter, the object it will work on. [ See Function @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
for a detailed explanation of `apply()`, `call()` and `bind()` as we will be using these to achieve our goal.

There are three similar ways to achieve this in JavaScript:

`arg0` will correspond to the object, the rest(`...args`) will represent the arguments to the method.  So here are the
three, you pick the one that provides the most clarity in your code.  Not single version will be universally the best.
Depending on the surrounding context, one implementation may provide more clarity than an other.

```js
const demethodize1 = fn => (arg0, ...args) => fn.apply(arg0, args);
const demethodize2 = fn => (arg0, ...args) => fn.call(arg0, ...args);
const demethodize3 = fn => (...args) => fn.bind(...args)();
```

But in general, the first one is the best (ed).  Here is an example of extracting several methods and using them as 
regular functions.

```js
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args)
const map  = demethodize( Array.prototype.map );
const join = demethodize( Array.prototype.join );
const toUpperCase = demethodize( String.prototype.toUpperCase );

console.log( join( map( 'functional', toUpperCase ), '') )
```

Here's an example for simply formatting of numbers via toLocaleString.
```js
const toLocaleString = demethodize(Number.prototype.toLocaleString);
const numbers = [2209.6, 124.56, 1048576];
const strings = numbers.map(toLocaleString);
```

But then again... your choice...
```js
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args)
const toLocaleString = demethodize( Number.prototype.toLocaleString );
const map            = demethodize( Array.prototype.map );

const numbers = [2209.6, 124.56, 1048576];

// map method follwed by demethodized map function
console.log( numbers.map( toLocaleString ) )
console.log( map( numbers, toLocaleString ) )

// Vanilla wihtout any shinanigans
console.log( numbers.map( x => x.toLocaleString() ) )
```

### Finding the Optimum

Suppose we want to find the optimum value from a list of elements.  E.g. the Maximum.  We could:

```js
const findOptimum = arr => Math.max( ...arr )
const array = [22, 9, 60, 12, 4, 56]
console.log( findOptimum( array ) )
```

This has issues.  Firstly, perhaps `Math.max()` isn't always going to be the optimum function.  Second, this depends on 
each element having a numeric value.  Which isn't a requirement for JavaScript arrays.

See code from the book for a lengthy and yet insufficient implementation that is slightly better.

