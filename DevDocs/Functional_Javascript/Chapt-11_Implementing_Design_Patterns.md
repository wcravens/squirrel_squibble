# Chapter 11 - Implementing Design Patterns; The Functional Way

Since design patterns are well known, and programmers will likely already be
aware of how they are applied in other languages, it's important to take a look at how a
functional implementation would be done.

In this chapter, we shall consider the solutions implied by design patterns, which are
common in OOP, to see their equivalences in FP. This will help you to transition from OOP
to a more functional approach and to learn more about the power and methods of FP, by
seeing an alternative solution to problems you already knew.

In particular, we will study the following topics:
- The concept of design patterns and to what they apply
- A few OOP standard patterns and what alternatives we have in FP if we need one
- In particular, the observer pattern, which leads to reactive programming, a declarative way of dealing with events
- A discussion about FP design patterns, not related to the OOP ones


## Understanding Design Patterns

In software terms, a ***design pattern*** is a generally applicable, reusable solution to a
commonly-seen problem in ***software design***. Rather than a specific finished and coded
design, it's a description of a solution (the word *template* is also used) that can solve a given
problem that appears in many contexts. Given their advantages, design patterns are on
their own *best practices* that can be used by developers working with different kinds of
systems, programming languages, and environments.

Not all *design patterns* developed for OOP cannot be recommended for applied to Functional Programming.  Many patterns
are necessary or irrelevant because functional programming designs already provide standard solutions to the related
OOP problems.  And often these solutions are in general principles and methodologies rather than 'patterns' to be
followed as one would a recipe.

The reference book that these notes are taken from approaches this topic from the perspective that the reader will have
a prior understanding of OOP principles and the application of design patterns in OOP code. The book then provides
the reader with topical comparisons between what is assumed to be familiar techniques and the functional programming
technique central to the primary goal/s. These notes, however, will skip these comparisons as irrelevant and focus on
any new material specific to functional programming.

These notes will maintain the *design pattern* paradigm but only when relevant to a functional programming context.

Patterns are often described in terms of four essential, basic elements:

- A simple, short ***name*** that is used to describe the problem, its solutions, and its consequences. The name is
  useful for talking with colleagues, explaining a design decision, or describing a specific implementation.
- The ***context*** to which the pattern applies: specific situations that require a solution, possibly with some extra
  conditions that must be met.
- A ***solution*** that lists the elements (objects, functions, relationships, and so on) that you'll need to solve the
  given situation.
- The ***consequences** (results and trade-offs) if you apply the pattern. You may derive some gains from the solution,
  but it may also imply some losses.


### Design Pattern Categories

***Behavioral design patterns***: These have to do with interactions and
communications between objects. Rather than focusing on how objects are
created or built, the key consideration is how to connect them so that they can
cooperate when performing a complex task, preferably in a way that provides
well-known advantages, such as diminished coupling or enhanced cohesiveness.

***Creational design patterns***: These deal with ways to create objects in a manner
that is suitable for the current problem. With it, you can decide between several
alternative objects, so the program can work differently depending on
parameters that may be known at compilation time or runtime.

***Structural design patterns***: These have to do with the composition of objects,
forming larger structures from many individual parts and implementing
relationships between objects. Some of the patterns imply inheritance or
implementation of interfaces, whereas others use different mechanisms, all
geared toward being able to dynamically change the way objects are composed at
runtime.

***Concurrency patterns***: These are related to dealing with multithreaded
programming. Although FP is generally quite appropriate for this (given, for
example, the lack of assignments and side effects), since we are working with
JavaScript, these patterns are not very relevant to us.

***Architectural patterns***: These are more high-level oriented, with a broader scope
than the previous patterns we've listed, and provide general solutions to
software architecture problems. As is, we aren't considering such problems in
this book, so we won't deal with these either.

As we mentioned earlier, we can now readily observe that these categories are heavily
oriented toward OOP, and the first three directly mention objects. However, without the
loss of generality, we will look beyond the definitions, remember what problem we were
trying to solve, and then look into analogous solutions with FP, which, if not 100%
equivalent to the OOP ones, will in spirit be solving the same problem in a parallel way.

### Do we need Design Patterns?

There is an interesting point of view that says that design patterns are only needed to patch
shortcomings of a programming language. The rationale is that if you can solve a problem
with a given programming language in a simple, direct, and straightforward way, then you
may not need a design pattern at all.

However, studying patterns lets you think about different ways of
solving problems, so that's a point in their favor.

Finally, it must be said that our point of view may affect what is considered a pattern and
what isn't. What may be a pattern to some may be considered a trivial detail for others. We
will find some such situations, given that FP lets us solve some particular problems in easy
ways, and we have already seen examples of that in previous chapters.

### Object-Oriented Design Patterns

We will be considering the following:
- ***Façade*** and ***Adapter***, to provide new interfaces to other code
- ***Decorator*** (also known as ***Wrapper***) to add new functionality to existing code
- ***Strategy***, ***Template***, and ***Command***, to let you fine-tune algorithms by passing functions as parameters
- ***Observer***, which leads to *reactive programming*, a declarative way of dealing with *events*
- Other patterns that do not so fully match the corresponding OOP ones


### Facade and Adapter

Facade is use to provide a different interface to another component. Most often this will be to provide a more relevant
and convenient interface to a consumed library. The idea is to provide a new interface to a system that makes it easier
to use. You might say that a Façade provides a better control panel to access certain functionalities,
removing difficulties for the user.

We assume that the code on the 'other side' of the facade is not under your control and either cannot or should not be
modified directly. The key to this is to implement a module of your own that will provide an interface that better suits
your needs. Your main code will use your facade module and won't directly interact with the original code.

The Adapter pattern is similar, insofar it is also meant to define a new interface.
However, while Façade defines a new interface to old code, Adapter is used when you need
to implement an old interface for a new code, so it will match what you already had. If you
are working with modules, it's clear that the same type of solution that worked for Façade
will work here, so we don't have to study it in detail.

***Note***; *In the preceding paragraph 'new' and 'old' should be interpreted in a certain way.  A Facade provides a 
new interface to code you do not control and have not yet consumed and Adapter provides a 'translation' layer between 
your code that exists prior and new code that you do not control.  AN other way to think about this is, Facade is used
to provide newly created interface from your application to a library, Adapter is used to adapt an existing interface
from your application to newly consumed support libraries.*

A good example of a Facade is an module that provides support functions to make using an otherwise complex API simplier
for your application code to consume.  A good example of an Adapter is a module that takes existing application code
for storage services and replicates the interfaces for a new database engine.  Any adapter can be subsituted for any 
other adapter for the same service/system.

### Decorator or Wrapper

The Decorator pattern (also known as wrapper) is useful when you want to add additional
responsibilities or functionalities to an existing function/object in a dynamic way.

Decorators are very the primary method for Component Composition in React.  Or in fact the DOM in general.  Also the
cascading part of cascading style sheets can be considered decorators.  Any time a 'parent' enhances a 'child' with
functionality it can be considered a decorator.

### Strategy, Template and Command

The ***Strategy*** pattern applies whenever you want to have the ability to change a method, or function, possibly in a
dynamic way, by changing the way it actually does whatever it's expected to do.  As an example, a routing algorithm may 
need to support different 'strategies' based on the transportation method being 'car', 'foot', 'bus', 'train',
'bicycle', etc.  The goal 'generate route' is the same, but the algorithm needs different strategies based on the
different needs of the use cases.

If you consider the ***Template*** pattern, the difference is that Strategy allows you to use
completely different ways of achieving an outcome, while Template provides an
overarching algorithm (or template) in which some implementation details are left to
methods to be specified.

For both Strategy and Template we use ***function injection*** to specify the necessary alternatives needed.  For
Strategy we may inject an entire algorithm, for Template we will more likely provide several supporting functions
based on the needs of the Template.

Finally, the ***Command*** pattern also benefits from the ability to be able to pass functions as
arguments. This pattern is meant to be enabled to encapsulate a request as an object, so for
different requests, you have differently parameterized objects. Given that we can simply
pass functions as arguments to other functions, there's no need for the enclosing object.

However, the **dispatch table** and **action** functions that we have seen earlier could be considered implementations
of a derivative of the ***Command*** pattern.

### Observer and Reactive Programming

The idea of the observer pattern is to define a link between entities, so when one changes, all
the dependent entities are updated automatically. The observable can publish changes to
its state, and its observer (which subscribed to the observable) will be notified of such
changes.

There's an extension to this concept called **reactive programming**, which involves
asynchronous streams of events (such as mouse clicks or keypresses) or data (from APIs or
web sockets), and different parts of the application subscribing to observe such streams by
passing callbacks that will get called whenever something new appears. 

The book covers Reactive-JS quite well.  But for the sake of time and since contemporary support frameworks and libraries
provide most if not all of this kind of functionality, we'll skip this for now.







