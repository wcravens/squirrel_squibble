# Chapter 7 - Transforming Functions; Currying and Partial Application

In this chapter we will explore a kind of *factory* design that will allow up produce new versions of any function
with some pre-defined fixed arguments.

We will be considering the following:

- ***Currying***: A classic FP theoretical function that transforms a function with many parameters into a sequence of
  unary
  functions.
- ***Partial application***: Another time-honored FP transformation, which produces new versions of functions by fixing
  some of their arguments.
- ***Partial currying***: Can be seen as a mixture of the two previous transformations. ***Note:*** *Terminology
  invented by the book author.*


Some of these techniques can be emulated, possibly with greater clarity, by simple arrow functions.

## A Bit of Theory

***Currying*** is the process of transforming an *m-ary function* (that is, a function of arity m) into a sequence of
*m unary functions*, each of which receives one argument of the original function, from left to right. (The first function
receives the first argument of the original function, and returns a second function that receives the second argument,
and returns a third function that receives the third argument, and so on.) Upon being called with an argument, each
function produces the next one in the sequence, and the last one does the actual calculations.

***Partial application*** is the idea of providing *n* arguments to an *m*-ary function, where *n <= m*, to
transform it into a function with (*m-n*) parameters. Each time you provide some arguments, a new function is produced,
with smaller arity. When you provide the last arguments, the actual calculations are performed.

***Partial currying*** is a mixture of both of the preceding ideas: you provide *n* arguments (from left to right) to
an *m*-ary function and you produce a new function of arity (*m-n*). When this new function receives some other
arguments, also from left to right, it will produce yet another function. When the last parameters are provided, the
function produces the correct calculations.

We will implement these concept in different ways to illustrate the options available in JavaScript and which we may
find interesting in other applications.

## Currying

Many libraries (such as Lodash, Underscore, Ramda, and others) provide this functionality.  If you want further details
on how to do this by hand, refer to the book, or the source code for the libraries.

## Partial Application 

Imagine you have a function with five parameters. You might want to fix the second and fifth parameters, and partial
application would then produce a new version of the function that fixed those two parameters but left the other three
open for new calls. If you called the resulting function with the three required arguments, it would produce the correct
answer, by using the original two fixed parameters plus the newly provided three.

The idea of specifying only some of the parameters in function application, producing a function of the remaining
parameters, is called **projection**: you are said to be *projecting* the function onto the remaining arguments. We will
not use this term, but I wanted to cite it, just in case you happen to find it somewhere else

Let's consider an example, using the `fetch() ` API, which is widely considered to be the modern way to go for Ajax
calls. You might want to fetch several resources, always specifying the same parameters for the call (for example,
request headers) and only changing the URL to search. So, by using partial application, you could create a new
`myFetch()` function that would always provide fixed parameters. 

This implies that you have some 'undefined' parameters that appear first in the list of parameters for the function
call.  If you just had to alter the first and some succeeding params then currying would suffice.

Assuming you have a `partial()` function that provides this transformation:

```js
const myFetch = partial(fetch, undefined, myParameters);
```

### Partial Application with Arrow Functions

Really almost too simple to mention...

```js
const nonsense = (a, b, c, d, e) => `${a}/${b}/${c}/${d}/${e}`;
const fix2and5 = (a, c, d) => nonsense(a, 22, c, d, 1960);
const fixLast = (a, c) => fix2and5(a, c, 9);
```

### Partial Application with Eval

NOPE!!!


***Note:*** **Skipped the rest of this chapter.  Not all that useful really.**
