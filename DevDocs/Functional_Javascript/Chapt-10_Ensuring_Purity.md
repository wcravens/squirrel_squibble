# Chapter 10 - Ensuring Purity; Immutability

Let's talk about the concept of *immutability*: how to work with objects in such a way that accidentally modifying them
will become harder or, even better, impossible.

If we can find some way to make data structures immutable (meaning that they cannot be directly changed, except through
some interface that never allows us to modify the original data and produces new objects instead), then we'll have an
enforceable solution.

We will look at two distinct approaches to working with such immutable objects and data structures:

- Basic JavaScript ways, such as freezing objects, plus cloning to create new ones instead of modifying existing objects
- Persistent data structures, with methods that allow us to update them without changing the original and without the
  need to clone everything either, for higher performance

Some straightforward JavaScript techniques to disallow mutating side effects:
- Avoiding mutator functions that directly modify the object that they are applied to
- Using const declarations to prevent variables from being changed
- Freezing objects so that they can't be modified in any way
- Creating (changed) clones of objects to avoid modifying the original
- Using getters and setters to control what is changed and how
- Using a functional concept—lenses—to access and set attributes

Several JavaScript methods are actually mutators that modify the underlying object.

Arrays are the most basic sources of problems and the list of troublesome methods isn't short:

- copyWithin() lets you copy elements within the array.
- fill() fills an array with a given value.
- push() and pop() let you add or delete elements at the end of an array.
- shift() and unshift() work in the same way as push() and pop(), but at the beginning of the array.
- splice() lets you add or delete elements anywhere within the array.
- reverse() and sort() modify the array in place, reversing its elements or ordering them.

[See Array#Mutator Methods @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Mutator_methods)

The spread operator `...` and `slice()` can both be used to generate a 'copy' of an array that can be acted on by 
mutator methods.

```js
const newArray = arr => [...a].sort();
const newArray = arr => a.slice().sort();
```

### Constants

Don't be fooled into thinking that JavaScript `const` declarations are immutable constants.

In JavaScript, a const definition means that the reference to the object or array cannot change (you cannot assign a
different object to it) but you can still modify the properties of the object itself.

Only the reference to an object is constant, and not the object's values themselves.

### Freezing

```js
const array = Object.freeze([22, 9, 60, 24, 11, 63])
```

Freezing an object is a shallow operation that freezes the attributes themselves, similar to what a const declaration
does. If any of the attributes are objects or arrays themselves, with further objects or arrays as properties, and so
on, they can still be modified.

If we want to achieve real immutability for our object, we need to write a routine that will freeze all the levels of
an object.  This is relatively straight forward with recursion.

```js
const deepFreeze = obj => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]));
  }
  return obj;
};
```

But all of that is basically academic.  You should use one of the many libraries that provide different styles of
immutability.  One of which is bound to meet your needs.  And many higher order libraries, like Redux-Toolkit, have
simple to use immutability baked in.

### Cloning and Mutating

Same deal as with Freezing.  Use a library.  Most likely any immutable library you use will handle all of this for you.
This is a good idea because there are so many edge cases and performance/optimization issues that you really should
delegate these responsibilities to a respectable and mature library.

### Getters and Setter

Same, use your immutability library.

### Lenses

This is another pattern/methodology that provide functional ways to *focus* on a given spot in an object so that we can
access or modify its value in a non-mutating way.

But again, Libraries.

### Creating Persistent Data Structures

This covers the general idea behind some libraries such as `Immer`.  Immer is what Redux-Toolkit uses to provide non-disruptive immutability that is easy to work with in reducers.  When a reducer is wrapped in immer, you can use what
appears to be direct mutation of values, but immer handles the change details behind the scenes ensuring that nothing
is every mutated and that just in time copies of data structures are created to host the new values.

This section covers the inner details of these techniques, but we will skip for this review.









