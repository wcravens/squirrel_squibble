# Chapter 5 - Programming Declaratively; A Better Style

Up to now, we haven't really been able to appreciate the possibilities of Functional Programming (FP) as it pertains to
working in a higher-level, declarative fashion. In this chapter, we will correct this, and start getting shorter, more
concise, and easier to understand code, by using some higher-order functions (HOF); that is, functions that take
functions as parameters.

We will also be able to work in a fluent fashion, in which the output of a function becomes the input of the next one, a
style we will look at later.

## Transformations

The first set of operations that we are going to consider work on an array and process it in the base of a function to
produce some results. There are several possible results: a single value with the `reduce()` operation; a new `array`
with `map()`; or just about any kind of result with `forEach()`.

### Reducing an Array to a Value

In usual FP parlance, we speak of ***folding operations***: `reduce()` is **foldl** (for *fold left*) or just plain
*fold*, and `reduceRight()` is correspondingly known as **foldr**. In category theory terms, both operations are
**catamorphisms**: *the reduction of all the values in a container down to a single result*.

So why `reduce()` and `reduceRight()` instead of roll-your-own-loops?

- All the aspects of loop control are automatically taken care of, so you don't even have the possibility of, say, an
  off-by-one mistake.
- The initialization and handling of the result values are also done implicitly.
- Unless you work really hard at being impure and modifying the original array, your code will be side effect free.

Basically, to reduce an array, you must provide a **dyadic function** (that is, a function with two parameters;
*binary* would be another name for that) and an initial value.

### Summing an Array

```js
const array = [22, 9, 60, 12, 4, 56]
const sum = ( a, b ) => a + b
console.log( array.reduce( sum, 0 ) )
```

Using the name sum for our function provides further clarity to our understanding of what the reduce function is doing
than an anonymous function would provide.  This is *good practice*.

***Note:*** *In fact the second argument to reduce defaults to the first element in the array and begins the reduction
with the second element using the first as the initiator.  Be careful with this assumption; an empty array would result
in a runtime error: `TypeError: Reduce of empty array with no initial value`.*

Part of the reason for the **foldl** name seen previously (at least, its ending l) should now be clear: the reducing
operation proceeds from *left to right*, from the first element to the last.

### Calculating an Average

If you were explaining how to compute an *average of a list of numbers* to someone, your answer would be something
like *sum all the elements in the list* and *divide by the number of elements*. In programming terms, is not a
***procedural*** description (you don't explain how to *sum elements*, or how to *traverse the array*), but rather a
***declarative*** one, since you say *what to do*, not *how to do it*.

```js
const array = [22, 9, 60, 12, 4, 56]
const sum = ( x, y ) => x + y
const avg = _ => _.reduce( sum, 0 ) / _.length
console.log( avg( array ) )
```

***Note:*** *Some simple changes above; Replace `( a, b )` with `( x, y )`.  Obviously this is simply a matter of naming
preferences. There is no semantic different, just a matter of personal style.  Some would also encourage more
descriptive names suce as `elementA` and `elementB` where this provides more clarity.  In these functions the intention
is so simple and meaning so clear that simple placeholder names are appropriate.  This is further demonstrated by the
extremely turse use of `_` as a parameter name.  Very common when context and type have little impact.*

Notice how the `avg()` function has a very expressive syntax that describes exactly the calculations necessary to
achieve the required result.

The `reduce()` method is also passed the index of the current position of the array, as well as the array itself.  Using
this functionality we could also define our function as...

```js
const array = [22, 9, 60, 12, 4, 56]
const sum = ( x, y ) => x + y
const avg = ( sum, val, ind, arr ) => {
  sum += val;
  return ind === arr.length - 1 ? sum / arr.length : sum
}
console.log( array.reduce( avg, 0 ) )
```

The later implementation is perhaps a `clever` mathematical manipulation leveraging recursion, but it's doubtful that
any reader of the code will find it provides any more clarity.  In other words, the first version is vastly superior
for our goal of providing clarity and ability to reason about our code later.

***Note:*** *Getting the `array` by reference and `index` by value means that you could easily turn our `reduce()`
function into an impure one.  `reduce()` functions are by their nature assumed to be pure functions.  So don't **ever**
do this.

### Computing Several Values at Once

`reduce()` functions should always return a single result. But in Javascript there is no need for this result to be a
value. It could just as well be an `object` with several properties or in fact a function, or object with method
properties.  This kind of object is often referred to as an *accumulator* with named parameters like `accum`.


### Folding Left and Right

`reduceRight()` methods are just the same as `reduce()` only they start with the other end of the array and process the
elements in reverse order.
[ See ReduceRight @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)


```js
const revString = str => str.split("").reduceRight( ( x, y ) => x + y )
console.log( revString( 'OEDIVETNOM' ) )
```

***Note:*** *Considering that ```Array.reduceRight( f ) === Array.reverse().reduce( f )``` it may be tempting to ignore
`reduceRight()` because we may argue that `.reverse.reduce()` provides more clarity.  But CAUTION: `reverse` is a
mutating method so at best we would end up with `Array.slice().reverse().reduce()` which is clearly starting to
clutter our ability to reason about what is happening.  Stick with `reduceRight()` where it is appropriate.*

### Applying an operation - `map()`

In mathematics, a map is a transformation of elements from a **domain** into relative elements in a **co-domain**.
Recall also that the mathematical definition of a function is a computation that returns one and only one value for any
given input.

Combining these, the `map()` operator transposes elements from a list of elements in one domain to a comparable list
of elements in a co-domain by transposing each element in the input list with the appropriate function.

***Note:*** *Some more terminology: We would say that an array is a ***functor*** because it provides a mapping operation
with some pre-specified properties. In category theory, the mapping operation itself would be called a* ***morphism***.

The advantages of using `map()` over procedural loops include:

- First, you don't have to write any loops procedurally, so that's one less possible source of bugs.
- Second, you don't even have to access the original array or the index position, even though they are there for you to
  use if you really need them.
- Lastly, a new array is produced, so your code is pure (though, of course, if you really want to produce side effects,
  you can!).

There are only two caveats when using this:

- Always return something from your mapping function. If you forget this, then you'll just produce an undefined-filled
  array, because JavaScript always provides a default return undefined for all functions.
- If the input array elements are objects or arrays, and you include them in the output array, then JavaScript will
  still allow the original elements to be accessed.

***Note:*** *`Array.from( arrayLike, mapFn )` is an alternative way to process elements from an `arrayLike` thing.

### Extracting Data from Objects

Mapping over an array of object and extracting values is common.

```js
const markers = [
  {name: "AR", lat: -34.6, lon: -58.4},
  {name: "BO", lat: -16.5, lon: -68.1},
  {name: "BR", lat: -15.8, lon: -47.9},
];

console.log( markers.map( x => x.name ) ) 
```

But this can produce incorrect results...

### Parsing Numbers Tacitly

Say you received an array of strings representing numeric values, and you wanted to parse them into actual numbers.

```js
const numbers = ["123.45", "67.8", "90"]

console.log( numbers.map(parseFloat) )
// [123.45, 67.8, 90]
console.log( numbers.map( parseInt ) )
// [123, NaN, NaN]
```

Something went wrong with the second mapping to integers.

The answer lies in a problem with **tacit programming**. Similarly to *An Unnecessary Mistake* AKA: *Unnecessarily
wrapping functions and passing of arguments...*  from Chapt 3, when you don't explicitly show the parameters to a
function, it's easy to have some oversights.  In this case `parseInt()` takes multiple arguments and `map()` provides
multiple arguments.  Therefor the `parseInt()` function is being passed unwanted arguments (particularly for the `radix`
parameter) from `map()`.  It's best to always provide the `radix` parameter explicitely by argument because certain
browser may, for example, interpret strings starting with '0' as 'octal'.

[ See parseInt @ MDN ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

### Working with Ranges

Suppose we want a `range(start,stop)` function that generates an array of numbers, with values ranging from `start`
(inclusive) to `stop` (exclusive).

```js
const range = ( start, stop ) => new Array( stop - start ).fill().map( ( v, i ) => start + i )
console.log( range( 2, 7 ) )
```

***Note:*** *We use `fill()` in the above implementation because `empty` elements resolve to `empty` regardless of what
map function is used.  `fill()` at least fills them with `undefined` so that the map function can work as expected.*

***Note:*** Libraries such as the popular `underscore` and `lodash` provide more powerful and excellently implemented
functions for providing range solutions.

A better implementation of factorial using our `range()` function.

```js
const product = ( x, y ) => x * y
const factorial = n => range( 1, n + 1 ).reduce( product, 1 )
console.log( factorial(5) )
console.log( factorial(3) )
console.log( factorial(0) )
```

Here is another example where the initial value provided to reduce is important.  To get `factorial(0) === 1` it is
necessary to provide the starting value of 1.  The reason is that `range( 1, 1 )` produces an empty array.  And 
`reduce()` on an empty array returns the initial value.  With no initial value you would get a runtime error.

Ranges are useful for creating all kinds of lists, not just lists indexes like earlier.

```js
const ALPHABET = range("A".charCodeAt(), "Z".charCodeAt() + 1).map(x => String.fromCharCode(x) );
console.log( ALPHABET )
```

### Emulating `map()` with `reduce()`

```js
const array = [22, 9, 60, 12, 4, 56]
const increment = x => x + 1
const altMap = ( arr, fn ) => arr.reduce( ( x, y ) => x.concat( fn(y)), []);

console.log( array )
console.log( array.map( increment ) )
console.log( altMap( array, increment ) )
```

The idea is that we apply the function to each element of the array and we `concat()` the result to (an initially empty)
result array.  This is also an example of an ***accumulator*** that was mentioned earlier.

## Dealing with Arrays of Arrays

Arrays of Arrays are extremely common.  They are an important implementation of anything that is multi-dimensional.
E.g. a system of points in cartesian coordinates could be represented as `[ [x1,y1], [x2,y2], [x3,y3]... ]`.

### Flattening an Array

The `flat()` method creates a new array, concatenating all elements of its sub-arrays to the desired level, which is,
by default, 1.
[ See Array.prototype.flat() @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

```js
const a = [[1, 2], [3, 4, [5, 6, 7]], 8, [[[9, 10]]]];
console.log(a.flat()); // or a.flat(1)
// [ 1, 2, 3, 4, [ 5, 6, 7 ], 8, [ 9, 10 ] ]

console.log(a.flat(2));
// [ 1, 2, 3, 4, 5, 6, 7, 8, [ 9, 10 ] ]

console.log(a.flat(Infinity));
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

Suppose we need to find the maximum value in a multi-dimensional array.

```js
const distances = [
  [0, 20, 35, 40],
  [20, 0, 10, 50],
  [35, 10, 0, 30],
  [40, 50, 30, 0],
];

// Flatten, spread, and use Math.max()
console.log( Math.max( ...distances.flat() ) )

// Flatten, and use `reduce()` to find the maximum.
console.log( distances.flat().reduce( ( p, d ) => Math.max( p, d ), 0 ) )
```

### Mapping and Flattening - `flatMap()`

[ See Array.prototype.flatMap() @ MDN ]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap )

The `flatMap()` method returns a new array formed by applying a given callback function to each element of the array,
and then flattening the result by one level. It is identical to a `map()` followed by a `flat()` of depth 1 (`arr.map(
...args).flat()`), but slightly more efficient than calling those two methods separately.

### More General Looping

When neither `map()` or `reduce()` are quite right there is always `forEach()`

[ See Array.prototype.forEach() @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach)

Where not going to dwell on this.  It's pretty self-explanatory and documentation at MDN has any other details you need.

## Logical Higher Order Functions

A bit of terminology: the word **predicate** can be used in several senses (as in predicate logic), but for us, in
computer science, it has the meaning of a function that returns `true` or `false`. Okay, this isn't a very formal
definition, but it's enough for our needs. For example, saying that we will *filter* an array depending on a predicate
just means that we get to decide which elements are included or excluded depending on the result of the predicate.

### Filtering an Array

Like `map()`, `filter()` will evaluate each element in turn according to a function.  `filter()` will require a
**predicate** function which simply means it returns a `boolean` value.  *Or in the case of JavaScript and some other 
languages a boolean-like (referred to as truthy/falsy) value*.

The result of the evaluation function determines rather or not the original element is kept or discarded.  Filter will
an array that is identical to the input, sorter than the input or empty.

[ See filter() @ MDN ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

There are a couple of things to remember when filtering an array:

- Always return something from your predicate: If you forget to include a return, the function will implicitly return
  undefined, and since that's a falsy value, the output will be an empty array.
- The copy that is made is shallow: If the input array elements are objects or arrays, then the original elements will
  still be accessible.

### Searching an Array

I'm bored with this chapter/section...
so [ See Array.prototype.find() @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
and [ See Array.prototype.findIndex() @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findindex)

### Higher level predicates - `some()` and `every()`

`every()`: `true` *if and only if* every element in the array satisfies a given predicate.\
`some()`: `true` if *at least one element* in the array satisfies the predicate.

### Checking negatives - `none()` as contra to `every()`

Something like, *this is untested*.  As I already said... I'm bored, AND sleepy!!!
`const none = (...args) => !arr.every(...args)`

## Working with Async Functions

Consider the following well-behaved async program:

```js
const fakeAPI = ( delay, value ) => new Promise( resolve => setTimeout( () => resolve(value), delay ) )
const useResult = x => console.log(new Date(), x);
(async () => {
  console.log( "START" );
  console.log( new Date() );
  const result = await fakeAPI( 1000, "SomeValue" );
  useResult( result );
  console.log( "END" );
})();
```

and it's broken relative...
```js
(() => {
  console.log("START FOREACH");
  [1, 2, 3, 4].forEach(async n => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });
  console.log("END FOREACH");
})();
```

Methods similar to forEach and the like are meant to be used with common, sync function calls, and behave strangely with
async function calls. The key concept is that async functions always return promises, so that after getting the `START
FOREACH` text, the loop is actually creating four promises (which will get resolved at some time), but without waiting
for them, and our code goes on to print the `END FOREACH` text. 

### Async-ready looping

#### Looping over Async Calls

Since async calls return promises, we can emulate `forEach()` with `reduce()` by starting with a resolved promise and
chaining to it the promises for each value in the array. The `then()` methods will be called in the right order, so the
results will be correct. The following piece of code manages to get the right, expected results: 

```js
const forEachAsync = (arr, fn) =>
  arr.reduce(
    (promise, value) => promise.then(() => fn(value)),
    Promise.resolve()
  );
(async () => {
  console.log("START FOREACH VIA REDUCE");
  await forEachAsync([1, 2, 3, 4], async n => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });
  console.log("END FOREACH VIA REDUCE");
})();
```

### Mapping Async Calls

```js
const mapAsync = (arr, fn) => Promise.all(arr.map(fn));
(async () => {
 console.log("START MAP");
 const mapped = await mapAsync([1, 2, 3, 4], async n => {
 const x = await fakeAPI(n * 1000, n);
 return x;
 });
 useResult(mapped);
 console.log("END MAP");
})();
```

### Filtering Async Calls

BORED AND SLEEPY!!!

### Reducing Async Calls

BORED AND SLEEPY!!!


