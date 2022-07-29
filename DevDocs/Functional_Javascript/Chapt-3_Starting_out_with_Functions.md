# Chapter 3 - Starting out with Functions

**In this chapter, we'll cover several important topics:**

- Functions in JavaScript, including how to define them, with a particular focus on arrow functions
- Currying and functions as first-class objects
- Several ways of using functions in an FP way

## All about functions

**In particular, we'll be looking at the following:**

- Some basic and very important concepts about lambda calculus, which is the theoretical basis for FP
- Arrow functions, which are the most direct translation of lambda calculus into JavaScript
- Using functions as first-class objects, a key concept in FP

Parameters vs Arguments

If you sometimes wonder about the difference between *arguments* and *parameters*, a mnemonic with some alliteration may
help: ***Parameters are Potential, Arguments are Actual***. Parameters are placeholders for potential values that will be
passed, and arguments are the actual values passed to the function. In other words, when you define the function, you
list its parameters, and when you call it, you provide arguments.

### Arrow Functions

In this section, we'll go into several JavaScript function-related topics, including:

- How to return different values
- How to handle problems with the value of `this`
- How to work with varying numbers of arguments
- An important concept, *currying*, for which we'll find many usages in the rest of the book

Arrow functions cannot be used as constructors, they do not have a prototype property, and they cannot be used as
generators because they don't allow the yield keyword. For more details on these points,
see [Arrow Functions @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this).

When using Arrow notation to define a lambda expression `( params ) => expression`, return is implied.

```js
const f1 = (x, y, z) => x + y + z;
const f2 = (x, y, z) => {
  return x + y + z;
};
```

If you want to `return` an object you mush use parentheses.

```js
const augObj = obj => ( { ...obj, newProperty: 'foo' } )
```

## One Argument or Many?

***Consider using one argument instead of many.  Use currying and function combination when more than one argument
is necessary.***

## Functions as Objects

***Note:*** *Remember that JavaScript *hoists* declarations to the top of the scope, but it does not hoist
assignments.*

[See Hoisting @ MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

```js
woof() // ok
meow() // no ok

function bark() { console.log( 'Woof!') }

const meow = () => console.log( "meow" )
meow() // ok
bark() //ok
```

Using the nature of functions as first-class objects, we can assign them to the properties of an object and use that as
a *dispatch table* / *router*.

```js
const dispatch = {
  create: ( state, action ) => doStuff,
  retrieve: ( state, action ) => doStuff
}

const dispatchAction = ( state = initialState, action ) =>
  dispatch[ action.type ]
    ? dispatch[ action.type ]( state, action )
    : state
```

### Unnecessarily wrapping functions and passing of arguments...

Something is wrong here...

```js
fetch( "some/url" )
  .then( data => process( data ) )
```

... for immediate relieve

```js
fetch( "some/url").then( process )
```

... now read on.

in lambda calculus terms, we are replacing ***λx.func x*** with simply ***func*** —this is called an **eta conversion**,
or more specifically, an **eta reduction**. (If you were to do it the other way round, it would be an **eta
abstraction**.) In our case, it could be considered a (very, very small!) optimization, but its main advantage is
shorter, more compact code.

This programming style is called **pointfree** style or **tacit** style, and its main characteristic is that you never
specify the arguments for each function application. An advantage of this way of coding is that it helps the writer (and
the future readers of the code) think about the functions themselves and their meanings instead of working at a low
level, passing data around and working with it. In the shorter version of the code, ***there are no extraneous or
irrelevant details***: if you understand what the called function does, then you understand the meaning of the complete
piece of code. In our text, we'll often (but not necessarily always) work in this way.

*This is not unlike the way we use ***pipes*** for I/O in \*nix shells.*

### Working with Methods (*functions as properties on objects*)

If you ***must*** work with objects, remember that their methods are can be referenced without being bound to the
original object.

```js
fetch( "some/url" )
  .then( processObj.process ) // `process` will reference a *free function* and not bound to processObj.

fetch( "some/usr" )
  .then( processObj.process.bind( processObj ) )  // Nasty, but this gets the job done as intended.
```

[ See bind @ MDN ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

## Using Function in Functional Programming Ways.

We'll consider FP techniques, such as the following:

- Injection, which is needed for sorting different strategies, as well as other uses
- Callbacks and promises, introducing the continuation-passing style
- Polyfilling and stubbing
- Immediate invocation scheme

### Injection - Sorting it out

The `Array.prototype.sort()` methods accepts an injected function that controls the technique used for sorting.  The
following example is also a good example of using naming to provide clarity.

```js
const spanishAlphaSort = ( a, b ) => a.localeCompare( b, "es" )
const palabras = Object.freeze( ["ñandú", "oasis", "mano", "natural", "mítico", "musical"] )
// Incorrect sorting in the Spanish Language
console.log( palabras.slice().sort() )
// Correct sorting by injecting a sort function.
console.log( palabras.slice().sort( spanishAlphaSort ) )
```

***Note:*** This way of changing the way that the `sort()` function works by injecting different comparison functions
is actually a case of the ***strategy*** *design pattern*. We'll be learning more about this in ***Chapter 11,
Implementing Design Patterns – the Functional Way***.

Injecting a sort function also allows for appropriate sorting of numbers (default is alpha sorting of numbers were 10
comes before 2) and sorting of objects by a property value.


## Callbacks, promises, and continuations.

***Callbacks*** are a very common (but aged) pattern for asynchronous functions.

```js
const fs = require( 'fs' )
const lengthOfFile = fileName => fs.readFile (fileName, ( err, data ) => err
  ? console.log( `Error: ${err}!` )
  : console.log( `Data is ${data.length} long.` )
)
lengthOfFile( 'something.txt' )
lengthOfFile( 'Part_0.md' )
```

***Promises*** are a more modern way to handle async functionality.  [ See Promise @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
We were exposed to promises earlier in the code example for **Working with Methods**.

```js
fetch( "some/url" )
  .then( processData )
  .catch( processError )
```

***Async/Await*** is the most contemporary syntax to build Promises.

[ See async_function @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)\
[ See await @ MDN ]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await )

## Continuation Passing Style

Calling a function and passing another function that is to be executed when an I/O operation is finished, can be
considered an example of **continuation passing style (CPS)**.  Consider: *how would you program if the `return`
statement wasn't available.  This is covered in depth in ***Chapt 9 - Designing Functions***.

An interesting advantage of this way of coding is that by specifying yourself how the process is going to continue, you
can go beyond all the usual structures (`if`, `while`, `return`, and so on) and implement whatever mechanisms you want.

***Note:*** *It's not absolute, but ***think*** whenever you reach for `if`, `while`, `return`, etc.  Is there another
more descriptive way.*

But beware of creating program structure that is worse for the sake of some false notion of ***purity***.

![Goto Explained](./goto_explained_xkcd.png)

It's common (as with Promises) to pass more than one continuation function to handle exceptions or alternate cases.

## Polyfills

***Note:*** *Skipping... This is not necessary material.  But we may return and review later.*

## Stubbing

***Note:*** *Skipping... This is not necessary material.  But we may return and review later.*

Stubbing and Polyfills address the differences between runtime environments.  This is not necessary context for what
we are covering here. Also, this responsibility is usually taken care of by our build tools these days.


## Immediate Invocation

Immediate invocation (IIFE, pronounced *iffy*) is a common pattern to provide modularized functionality via closures.

```js
( function () {
  // Do stuff...
})()
  
//Alternately
( function () {
  // Do stuff...
}())
```
