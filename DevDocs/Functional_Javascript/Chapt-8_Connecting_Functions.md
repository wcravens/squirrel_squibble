# Chapter 8 - Connecting Functions; Pipelining and Composition

Here we explore how to create sequences of function calls and how to combine them to produce more complex results out of
several simpler components.

We'll cover the following topics:

***Pipelining***: A way to join functions together in a similar way to Unix/Linux pipes.\
***Chaining***: This may be considered a variant of pipelining, but is restricted to objects.\
***Composing***: This is a classic operation with its origins in basic computer theory.\
***Transducing***: An optimized way to compose map/filter/reduce operations.

Along the way, we will be touching on related concepts, such as the following:

**Pointfree style**, which is often used with pipelining and composition
**Debugging** composed or piped functions, for which we'll whip up some auxiliary tools
**Testing** composed or piped functions, which won't prove to be of high complexity


## Pipelining

Pipelining and composition are techniques that are used to set up functions so that they
work in sequence so that the output from a function becomes the input for the next
function. There are two ways of looking at this: from a computer point of view, and from a
mathematical point of view.

Starting with the computer perspective...


### Piping in Unix/Linux

In Unix/Linux, executing a command and passing its output as input to a second command, whose output will yield the
input of a third command, and so on, is called a ***pipeline**. This is quite a common application of the philosophy of
Unix, as explained in a Bell Laboratories article, written by the creator of the pipelining concept himself, Doug
McIlroy:

- Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new features.
- Expect the output of every program to become the input to another, so far unknown, program.

E.g. How many LibreOffice files (i.e. files that have the `.odt` filename extension ), are in the current directory.

`$ ls -1 | grep "odt$" | wc -l`

### Creating Pipelines

We want to be able to generate a pipeline of several functions. We can do this in two different ways: by building the
pipeline by hand, in a problem-specific way, or by seeking to use more generic constructs that can be applied with
generality.

### Building Pipelines by Hand

We'll implement the shell pipeline example from earlier.

```js
function getDir(path) {
  const fs = require("fs");
  const files = fs.readdirSync(path);
  return files;
}
const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterMarkDown = arr => filterByText(".md", arr);
const count = arr => arr.length

const countMarkdownFiles = path => count( filterMarkdown ( getDir( path ) ) )

console.log( countMarkdownFiles( '.' ) )
```
And in a more concise manor...
```js
const fs = require( 'fs' )

const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterMarkdown = arr => filterByText( ".md", arr)
const count = arr => arr.length
const countMarkdownFiles = path => count( filterMarkdown( fs.readdirSync( path ) ) )

console.log( count( filterMarkdown( fs.readdirSync( '.' ) ) ) )
```

But in both of these cases our functions are more 'inside out' than they are a sequential pipeline. This may be
straight forward enough for anyone used to functions and in fact accurately represents the construct of `f(g(x))` from
mathematics.  However, it's not as easy to read as it could be. 

Recall that our pure functions are associative.  E.g. `( 1 + 2 + 3 ) === ( 1 + 2 ) + 3 === 1 + ( 2 + 3 )`.  Therefore
we can aggregate/compose our functions in different ways.

***Note***: *Some libraries build this with functions called `flow()` or `sequence()`.  Here we will use `pipeline`.

Here is a nice tidy version...
```js
const getFileList = path => require('fs').readdirSync( path )
const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterMarkdown = arr => filterByText( ".md", arr)
const count = arr => arr.length

const pipeline = ( ...fns ) =>
  fns.reduce( ( result, f ) => (...args) => f(result(...args)))

console.log( pipeline( getFileList, filterMarkdown, count )(".") )
```

### Debugging Pipelines

Basically we would like to have an interim function to use in our pipeline that will provide output.  We can either 
create a stand-alone function for provide a wrapper to decorate another function with this logging functionality.

We'll start with an emulation of the *nix `tee` command.

```js
const tee = arg => ( console.log( arg ), arg )
```

[ See Comma Operator @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
to understand how the above expression works.

Here is a slightly better `tee` function that accepts a `logger` via parameter arguments:

```js
const tee = ( arg, logger = console.log ) => ( logger( arg ), arg )
```

### Tapping into a Flow

```js
// const pipeline = ...
const tee = tap( console.log )
console.log( pipeline( getFileList, tee, filterMarkdown,  count )(".") )
```

Using `addLogging()` from chapter 6 to decorate a function of interest:

```js
console.log( pipeline( getFileList, addLogging( filterMarkdown ),  count )(".") )
```

 
## PointFree Style

As discussed earlier, this is an example of ***tacit*** programming.

you don't need any intermediate variables to hold the results that will become arguments to the next function in line:
they are implicit. Similarly, you can write functions without mentioning their parameters; this is called the
***pointfree*** style.

We do this all the time without bothering to know what it is.  So skip this unless you really want more info.

## Chaining and Fluent Interfaces

When you work with objects or arrays, there is another way of linking the execution of several calls together: by
applying *chaining*.  This is very common when applying the array prototype methods that themselves return an array.

You can continue to call further `Array.prototype` methods on the arrays that are returned chaining them together.

E.g. in our `range` function we implemented earlier...

```js
const range = (start, stop) =>
 new Array(stop - start).fill(0).map((v, i) => start + i);
```

### An Example of Fluent APIs

The popular and feature rich graphing library D3 leverages this pattern...

```js
var node = svg
  .selectAll(".node")
  .data(pack(root).leaves())
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
  return "translate(" + d.x + "," + d.y + ")";
});
```

Many well known JavaScript libraries have adopted this pattern. This pattern is often complex to implement unless you
can simply get away with returning `this` from every method.  Starts smacking of too much like OOP.

## Composing

Composing is similar to pipelining, but had its roots in mathematical theory. The concept of composition is simply—a
sequence of function calls, in which the output of one function is the input for the next one—but the order is reversed
from the one in pipelining.

Composing is an important tool in FP because it also abstracts implementation details (putting your focus on what you
need to accomplish, rather than on the specific details for achieving that), thereby letting you work in a more
declarative fashion.

### Some Examples of Composition

Compose is clearer than pipeline when one of the functions acts as an operator on another.  E.g.
`compose( negative, num )(3)` is more naturally expressive than `pipeline( num, negative )(3)`.

### Finding Unique Words

```js
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args)
const pipeline = ( ...fns ) =>
  fns.reduce( ( result, f ) => (...args) => f(result(...args)))
const compose = (...fns) => pipeline(...(fns.reverse()));
const tap =  fn => args  => ( fn(args), args )
const tee = tap( console.log )

const GETTYSBURG_1_2 = `Four score and seven years ago our fathers brought forth on this continent, a new nation,
conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a
great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure.`;

const removeNonAlpha = str => str.replace(/[^a-z]/gi, " ");
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = str => str.trim().split(/\s+/);
const arrayToSet = arr => new Set(arr);
const setToList = set => Array.from(set).sort();

const getUniqueWordsComposed = compose(
  setToList,
  arrayToSet,
  splitInWords,
  toUpperCase,
  removeNonAlpha
);

console.log( getUniqueWordsComposed( GETTYSBURG_1_2 ).length )
const getUniqueWordsPiped = pipeline(
  removeNonAlpha,
  toUpperCase,
  splitInWords,
  arrayToSet,
  setToList
);
console.log( getUniqueWordsPiped( GETTYSBURG_1_2 ).length )
```

Take your pick which of the above methods suite your style and the surrounding context of your code the best.

## Transducing

When chaining methods to process large arrays, JavaScript will create, process and discard many intermediate arrays.
This causes computational delays.  *Transducing* is another tool for composing functions that can address optimization
issue such as this.

Consider...
```js
const testOdd = x => x % 2 === 1;
const testUnderFifty = x => x < 50;
const double = x => x + x;
const addThree = x => x + 3;

const myArray = [22, 9, 60, 24, 11, 63];
const a0 = myArray
  .filter(testOdd)
  .map(double)
  .filter(testUnderFifty)
  .map(addThree);

console.log( a0 )
```

The issue is that each method creates a new array given the output array of the previous method. We could instead apply
the transformation functions to each element in turn.

    for each element in the input list:
      for each transformation to be applied:
        apply the transformation to the element

To achieve this we need to be able to transpose the transformations. An example of the kind of thing we need was seen
when we implemented `map()` and `filter()` using `reduce()`. By using those definitions, instead of a sequence of
different functions, we will be applying the same operation (reduce) at each step.  Along with transposing we will also
edit the order in which our transforms are applied 

Instead of applying a first reduce operation, passing its result to a second, its result to a third, and so on, we will
compose all the reducing functions into a single one! Let's analyze this.  This pattern is leveraged in React and Redux.

### Composing Reducers

Essentially, what we want is to transform each function (`testOdd()`, `double()`, and so on) into a *reducing operation*
that will call the following reducer. A couple of higher-order functions will help; one for *mapping* functions and
another for *filtering* functions. With this idea, the result of an operation will be passed to the next one, avoiding
intermediate arrays:

```js
const mapTR = fn => reducer => (accum, value) => reducer(accum, fn(value));
const filterTR = fn => reducer => (accum, value) => fn(value) ? reducer(accum, value) : accum;
```

These two transforming functions are transducers: functions that accept a reducing function and return a new reducing
function.

A hand coded method of using these transducers could be...
```js
const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const duplicateR = mapTR(duplicate);
const addThreeR = mapTR(addThree);

const makeReducer = ( arr, fns ) => arr.reduce( compose(...fns)(addToArray), [] )
const a2 = makeReducer( myArray, [ testOddR, doubleR, testUnderFiftyR, addThreeR ] );

console.log( a2 )
```

However, we can do better to generalize this...

### Generalizing for all Reducers

To be able to work with all kinds of reducers and produce whatever kind of result they build, we'll need to make a small
change. The idea is simple: let's modify our `makeReducer()` function so that it will accept a final reducer and a
starting value for the accumulator:

```js
const makeReducer = ( arr, fns, reducer = addToArray, initial = [] ) =>
  arr.reduce( compose( ...fns )(reducer), initial );
```

To make this function more usable, we specified our array-building function (and [] as a starting accumulator value) so
that if you skip those two parameters, you'll get a reducer that produces an array. Now, let's look at the other option:
instead of an array, let's calculate the sum of the resulting numbers after all the mapping and filtering: 

```js
const sum = makeReducer( myArray, [ testOddR, doubleR, testUnderFiftyR, addThreeR ], (acc, value) => acc + value, 0 );
console.log( sum )
```
