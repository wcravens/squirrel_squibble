# Chapter 12 - Building Better Containers - Functional Data Types

In this chapter, we will look at data types from a
functional point of view. We'll be considering how we can implement our own data types,
along with several features that can help us compose operations or ensure their purity so
that our FP coding will become simpler and shorter.

We'll be touching on several themes:

- Data types from a functional point of view. Even though JavaScript is not a typed language, a better understanding of
  types and functions is needed.
- Containers, including functors and the mystifying monads, to structure data flow.
- Functions as structures, in which we'll see yet another way of using functions to represent data types, with
  immutability thrown in as an extra.


## Specifying Data Types

Not sure what to make of this section.  It describes a semi-formal method for writing comments to declare function
signatures.  This concept is dangerous because as we all know, comments and semantic code get out of sync very easily.

So basically, we will be adopting the 'Don't do this' approach to the methods described in the book.

## Building Containers

Skip the part about extending existing types by adding prototype functions such as `map()` where they do not exist
already.  The info is good, the patterns are ok, but modifying prototypes for built-in objects in JavaScript isn't
recommended.  By doing this you are bound to introduce a bug into some library or other you rely on for your system.

### Containers and Functors

A better way to extend the functionality of existing objects is via a *Decorator* or *Wrapper* pattern.  This will
provide a more general solution than altering the `prototype` as covered in the previous section.

We will do the following:
- Start by seeing how to build a basic container, wrapping a value
- Convert the container into something more powerful—a functor
- Study how to deal with missing values using a special functor, Maybe

### Wrapping a Value - a basic container

Let's pause for a minute and consider what we need from this wrapper. There are two basic requirements:
- We need a simple way to wrap a value.
- We must have a map() method.

To get started, let's create a basic container. Any object containing just a value would do,
but we want some additions, so our object won't be that trivial; we'll explain the differences
after the code: 

***Note***: *The book lost its gourd and suddenly started using classes.  The argument being that they are a more 
straight forward way to implement the following concepts.  We way 'Nay!' and demonstrate functional programing
techniques that result in clearer and simplier code.

```js
const Container = ( v ) => ( {
  value: v,
  map: () => Container( v )
} )

const s = Container( 2 )
  .map( x => x * x )
  .map( x => x.toString() )

console.log( s.value ); // 2, only every returns the original value because the map function is identity.
})
```

Notice that since the map function always returns a new Container, and container itself always return a new object
containing our initial value and the map function; our container objects are in fact immutable storeage.

The Container is relatively useless.  Basically it simply provides an immutable storage for our value and a map
function that only every returns the containers initial value.  It's a Container/Wrapper equivalent to an `identity()`
function.

```js
const Functor = ( v ) => ( {
  value: v,
  map: ( fn ) => Functor( fn( v ) )
})

const s = Functor( 2 )
  .map( x => x * x )
  .map( x => x.toString() )

console.log( s.value ); // 4
```

The `Functor` is more functional that the container.  It will allow arbitrary mapping of functions on its arbitrary
values.

If we wanted to we could add some more methods to our Functor.  E.g. `toString()` and `valueOf`.  But these can equally
be built from the outside with 'map( _ => _.toString() )' and 'map( _ => _)' respectively.  The book also describes an
`of()` method to create new functors.  But our implementation itself does the same job, similar to a constructor.  You
can provide map functions that cannot correctly operate on the Functors value 'type' but that's the case will all
Functors that are not overly complex.

A Functor's main usage is to provide us with a way to manipulate a value, apply operations to it, compose results, and
so on, without changing the original—in this sense, we are once again coming back to immutability.

    <SKIP SKIP SKIP>

## Functions as Data Structures

A function can actually implement a data type by itself, becoming a sort of container of its own.

We will represent a tree (or any other structure) with a function itself—not with a data structure that is processed by
a set of functions, nor with an object with some methods, but by just a function. Furthermore, we will get a functional
data structure that's 100% immutable, which, if updated, produces a new copy of itself. We will do all this without
using objects; here, closures will provide the desired results. 

The function will act as a container and it will produce, as its result, a
mapping of its contained values. Let's walk backward and start by looking at how we'll use
the new data type. Then, we'll go to the implementation details.

Creating a tree can be done by using two functions: `EmptyTree()` and `Tree(value, leftTree, rightTree)`.
For example, let's say we wish to create a tree using the following code... 

This late in the book is starting to get a bit scrappy.  Several topics have broken references with earlier paragraphs
having references that don't get covered until later paragraphs.  It is a good section on a functional way to build
a tree container.  But we'll save this for an other day and call this book DONE!!!

```js

```





