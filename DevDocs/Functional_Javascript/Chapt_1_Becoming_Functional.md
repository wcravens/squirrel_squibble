# Chapter 1 - Becoming Functional

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
Spread


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