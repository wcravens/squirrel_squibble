# Chapter 4 - Behaving Property - Pure Functions

In this chapter we will reconsider and apply arrow functions, injection and callbacks.  We will also...

- Consider the notion of *purity*, and why we should care about ***pure*** and ***impure*** functions.
- Examine the concept of ***referential transparency***.
- Recognize the problems implied by ***side effects***.
- Show some advantages of ***pure functions***.
- Describe the main reasons behind ***impure functions***.
- Find ways to minimize the number of **impure functions***.
- Focus on ways of testing both ***pure*** and ***impure*** *functions*.

## Pure Functions

A ***pure function*** satisfies two conditions:

1. **Given the same arguments, functions always compute and return the same result.**  *A necessary property for
   memoization*. The result cannot depend on any mutable outside information or state, nor depend on I/O results or
   stochastic values. *Referencing constants is still pure.*
2. **When computing its result, the function doesn't cause any observable** ***side effects***. E.g. I/O, mutation of
   objects or values, or any other changes to a program's state outside the function.

We might also invoke a software design principle and remind ourselves that a function ***should do one thing, only one
thing, and nothing but that thing***. If a function does anything else and has some ***hidden functionality***, then
that dependency on the state will mean that we **won't be able to predict the function's output** which makes things
much harder to reason about. 

## Referential Transparency

In mathematics, ***referential transparency*** is the property that lets you replace an *expression* with its *value*
without changing the results of whatever you were doing. The counterpart of referential transparency is, appropriately
enough, ***referential opacity***. A *referentially opaque* function cannot guarantee that it will always produce the
same result, even when called with the same arguments.

In ***lambda calculus***, if you replace the value of an expression involving a function with the calculated value for
the function, then that operation is called a ***β (beta) reduction***. Note that you can only do this safely with
referentially transparent functions.

Expressions involving I/O are not transparent, given that their results cannot be known until they are executed. For the
same reason, expressions involving date- and time-related functions or random numbers are also not transparent.

If you wanted to, you could classify functions as the following:

***Pure functions***: These return a value that depends only on its arguments and have no side effects whatsoever.\
***Side effects***: These don't return anything (actually, in JavaScript, these functions return an undefined value, but that's not relevant here), but do produce some kind of side effects.\
***Functions with side effects***: This means that they return a value that may not only depend on the function arguments, but also involve side effects.

In the style of functional programming, a primary benefit comes from the constraints of ***pure functions***.  They
provide much benefit when it comes to reasoning about a program's functionality.  For both humans and compilers.

## Side Effects

***Side effects*** can be defined as any change in state or an interaction with outside elements (the user, a web
service, another computer, whatever) that occurs during the execution of some calculations or a process.

In this section we will consider the following:

- Common side effects in JavaScript programming
- The problems that global and inner states cause
- The possibility of functions mutating their arguments
- Some functions that are always troublesome

In other words, from a functional programming perspective, this section is about ***what not to do***!

### The Usual Side Effects

- Changing global variables.
- Mutating objects received as arguments.
- Performing any kind of I/O, such as showing an alert message or logging some text.
- Working with, and changing, the filesystem.
- Updating a database.
- Calling a web service.
- Querying or modifying the DOM.
- Triggering any external process.
- Just calling another function that happens to produce a side effect of its own. You could say that impurity is
  contagious: a function that calls an impure function automatically becomes impure on its own!

### Global State

Don't reference non-constant global state.  Or any non-constant state outside the computation of the current result.

### Inner State

***Inner State*** is when our function has local variables that modify its behavior.  An incremental counter would
be a good example of this.

```js
// Not great; impure function, not idempotent.  Doesn't return the same value given inputs.
const count = ( () => {
  let last = 0;
  return () => last += 1
})()
}

// Pure
const increment = _ => _ + 1

let state = 0
state = increment( state )  // State is outside, but we are assigning it with the pure function `increment`.
console.log( state )
```

***Note:*** This usage of the internal state is the reason why many FP programmers think that using objects is
potentially bad. In OOP, we developers are used to storing information (attributes) and using them for future
calculations; however, this usage is considered impure, insofar as repeated method calls may return different values,
despite the fact that the same arguments are being passed. 

### Argument Mutation

In JavaScript arguments are passed by value, except in the case of `arrays` and `objects` that are passed by reference.
There for `arrays` and `objects` passes as arguments are susceptible to mutation inside the function.  In fact there are
several ***mutator*** methods on `objects` and `arrays` that change the underlying object by definition.  We must be
mindful of these functions.  Making objects immutable is one mitigation technique to avoid accidental mutations.

[ See Object.freeze() @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze ]

### Troublesome Functions

Some functions are simply impure by nature and either cannot be avoided, or care must be taken to only use these in the
impure components of our software design.

For instance, `Math.random()` is impure: it doesn't always return the same value, and it would certainly defeat its
purpose if it did! Furthermore, each call to the function modifies a global `seed` value, from which the next random
value will be calculated.

***Think*** *Math.random() may be im-pure, but internally it uses a deterministic function with a seed argument value to
determine the next pseudorandom value. Therefor the internal function (`randomGenerator( seed )`) is pure.*

If a function uses an impure function, it immediately becomes impure itself. The concern about impurity also extends to
any function that accesses the current time or date, because their results will depend on an outside condition (namely
the time of day) that is part of the global state of the application.

Several other functions that are also impure are those that impact I/O.  I/O however, pure and innocuous it appears to 
be, can always result in error.  Therefore, by definition, they are not pure.  Calling them twice with the same
arguments can always lead to an error condition.

Try to contain the impure elements of your software design in designated areas/components that are understood to be
impure.

## Advantages of Pure Functions.

After all the horror stories involving the impurities that we've just reviewed; let's look on the bright side and
consider the ways that Pure Functions can provide some relief.

The main advantage is that the lack of side effects contain all the function's responsibility inside the function.
Combined with keeping functions constrained to a single responsibility and making them short, results in functions that
are easy to reason about.  Combine all of this with good naming and program structure itself also becomes very clear and
also easy to reason about, even as complexity increases.

### Order of Execution

Pure functions are considered ***robust***. Their order of execution, regardless of order, won't ever have any sort of
unexpected impact on the system. As an extension of thought; pure functions can evaluate in parallel, assured that the 
results would be the same if executed in a single thread.

***Note:*** *The preceding comment doesn't really apply in JavaScript runtime environments because although it provides
very asynchronous abilities it does not provide us with any access to truly multithreaded behavior.*

In essence this property of pure functions is a combination of ***referential transparency*** and the ***commutative
property***.

### Memoization

Since the output of a pure function for a given input is always the same, you can cache the function results. This
process, which implies evaluating an expression only the first time and caching the result for later calls, is called
memoization. 

We will see in ***Chapt 6 - Producing Functions*** how we can memoize functions from the outside via higher order
functions.  Any pure function can be memoized from the outside (something that should really be obvious).

Of course, you don't need to do this for every pure function in your program. You'd do this sort of optimization only
for frequently called functions that take a certain important amount of time—if it were otherwise, then the added cache
management time would end up costing more than whatever you expected to save!

### Self-Documentation

As mentioned earlier in **Advantages of Pure Functions**; purity, combined with good naming habits can provide code that
is as clear and self documenting as possible.


### Testing

Pure functions limited to a single responsibility are trivial to test. And the tests themselves provide excellent
examples and documentation for how the function is to behave. You can simply focus on providing inputs and checking
outputs because all function calls can be reproduced in isolation, independent of any other state. 

## Impure Functions

Software with no side effects whatsoever would be pointless.  It would amount to a single function that returned a
single value determined by hard coded values.  In other words is would be computational equivalent to a constant.

Reducing side effects is a goal when using functional programming design principles.  We must consider how to avoid
using impure functions, where possible, and deal with them appropriately when they are necessary.  We'll want to look
for the best possible ways to limit their impact and scope within our software designs.

### Avoiding Impure Functions

With regard to the usage of the *global state*, both getting and setting it, the solution is well known. The key points
to this are as follows:

- Provide whatever is needed of the global state to the function as arguments.
- If the function needs to update the state, it shouldn't do it directly, but rather produce a new version of the state
  and return it.
- It should be the responsibility of the caller to take the returned state, if any, and update the global state.

This is commonly used in *reducer patterns*.

```js
const aReducer = ( state, action ) => action.type === 'something_I_care_about' ? doSomething( state, action ) : state
```

This is a very common application of ***Destructuring Assignment***.
[ See Destructuring Assignment @ MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### Injecting Impure Functions

If a function becomes impure because it needs to call another function that is itself impure, a way around this problem
is to inject the required function in the call. This technique actually provides more flexibility in your code and
allows for easier future changes, as well as less complex unit testing.

Injecting impure functions into functions provides a mechanism to make your impure function pure for testing and mock
purposes.  This is the functional equivalent of something like dependency injection.  Instead of calling the impure
function by named reference directly inside your function, you call the injected function. The injected function is
trivial to replace with a pure function resulting in your function also being pure.  *Assuming all other constraints
of purity have been met*.

### Is your function pure?

Can we test for purity?  The short answer is, not really.  It would require exhaustive and most likely an infinite
amount of testing.  There is a chance that compilers and interpreters can, but that's far beyond the scope of our
efforts here.

## Testing - pure vs impure

### Testing Pure Functions

Given the characteristics of pure functions that we have already described, most of your unit tests could simply be the following:

- Call the function with a given set of arguments.
- Verify that the results match what you expected.

We must be mindful of precision.  It is common to use test functions like `isCloseTo()` instead of `isEqualTo()`.  In
most cases this will be determined by your testing framework/s.

### Testing (our own) Purified Functions

We may have many functions that rely on impure functions that are injected via arguments.

It is common practice to mock up or 'stub' impure functions that we rely only on.  E.g. instead of injecting
`Math.random()` or some alternative impure function, we can `mock` or `stub` this function with a function of our own
design that is well understood and deterministic.  Then, by injecting this function we can test for the intended results
from our own functions.

### Testing Impure Functions

Testing impure functions boils down to a need for mocked state.  You create a predetermined state and ensure that your
function complies.  Edge case and error conditions have to be tested more rigorously with impure functions.  In short
your impure functions will on average require more extensive test suites to exercise many potential inputs and
results.

We can spy (a Jasmine term) on the `Math.random()` method and set a mock function that will return whatever values we
desire.

It's also often the case with impure functions that you will need to test altered states and other side effects.
Be careful though to not fall into the trap of testing well established and mature code from libraries leveraged in your
software design. *Note: As a safety measure, it's acceptable to write some tests for libraries that are immature or with
frequent breaking changes.*

Another technique involved repeated running tests, especially for injected randomness, to ensure that the function is
compliant.  However, the 'number' of interactions, or the coverage for the tests, will be a matter of debate.  *Absence
of evidence* is not *evidence of absence*.
