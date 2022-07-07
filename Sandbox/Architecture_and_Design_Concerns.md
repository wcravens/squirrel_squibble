# Architecture and Design Concerns

As much as possible we would like to extract the most poignant aspects from Domain Driven Design and OOP Patterns (
see [Implementing Domain Driven Design](./Implementing_Domain_Driven_Design.md) but then mix with Functional Programming
concepts and Event Sourcing.

## Code Organization, Layers and Packaging

[DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)\
![Explicit Architecture](070-explicit-architecture-svg.png)

[Best Practices for Nodejs Development](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development)

Package by Layer is Horizontal Slicing.  Consider packaging by Component to provide Vertical Slicing.

[Package by Component](http://www.codingthearchitecture.com/2015/03/08/package_by_component_and_architecturally_aligned_testing.html)

[Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html)\
[AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript)

## JSON Schema

We'll use JSON Schema to validate data structures such as Value Objects.

## Functional Programming

Since Javascript permits it, we should leverage Functional Programming techniques as much as possible.  At a minimum we
should implement as much functionality as possible in pure functions.

## Immutability

Value Objects will be immutable according to DDD, however we will strive to have everything on the inside of the outer
IO boundary use immutable data and pure functions.

## TDD / Testing Framework/s

Mocha Chai vs Jest

## Javascript Modules

[ECMA Script Modules](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#modules-ecmascript-modules)


## Scratchy References

[IBM / RedHat Node.js Reference Architecture](https://github.com/nodeshift/nodejs-reference-architecture)\
[Asynchronous Javascript: From Promises to Async/Await](https://scoutapm.com/blog/async-javascript)
