# Chapter 1 - Becoming Functional

In this chapter, we shall do the following:

- Introduce some concepts of FP to give a small taste of what it means.
- Show the benefits (and problems) implied by the usage of FP and why we should use it.
- Start thinking about why JavaScript can be considered an appropriate language for FP.
- Go over the language features and tools that you should be aware of in order to fully take advantage of everything in this book.

FP is based on producing the desired result by evaluating expressions built out of functions that are composed together.
In FP, it's common to pass functions around (such as passing parameters to other functions or returning functions as the
result of a calculation), to not use loops (opting for recursion instead), and to skip side effects (such as modifying
objects or global variables).

React + Redux are both functional independently and together.

For example, in React, it's said that the **view** (whatever the user gets to see at a given moment) is a **function**
of the current **state**. You use a function to compute what HTML and CSS must be produced at each moment, thinking in a
black-box fashion.

Similarly, in Redux you have the concept of **actions** that are processed by **reducers**. An action provides some
data, and a reducer is a **function** that produces the new **state** for the application in a functional way out of the
*current state* and the *provided data*. 

## Features of Quality Software

*TODO: Enhance this section from the book later*

Modular\
Understandable\
Testable\
Extensible\
Reusable

## Key Features of JavaScript

Functions as first-class objects\
Recursion\
Arrow functions\
Closures\
[Spread](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator)

***Note:*** *The Spread Operator is also handy for functions that act on a series of arguments but do not accept
arrays as arguments.  `call` is an example.  Consider ...

```js
someFunction.apply( thisArg, someArray )
// and
someFunction.call( thisArg, ...someArray )
```

Here is a function using most of our features. It accepts any other function and will execute it only one.

```js
const once = fn => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      fn(...args);
    }
  };
};
```
