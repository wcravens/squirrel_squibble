# Architecture and Design Concerns

As much as possible we would like to extract the most poignant aspects from Domain Driven Design and OOP Patterns (
see [Implementing Domain Driven Design](./Implementing_Domain_Driven_Design.md) but then mix with Functional Programming
concepts and Event Sourcing.

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

