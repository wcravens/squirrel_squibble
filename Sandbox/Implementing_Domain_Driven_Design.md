# [Implementing Domain Driven Design - Vaugn Vernon](https://www.google.com/books/edition/Implementing_Domain_driven_Design/aVJsAQAAQBAJ)


***Value Objects***: Data structure definitions / schema

***Entities***: Instance of a Value Object with an id and persistence. Entities have a lifecycle / history
over time.

***Aggregate***:  Cluster of Entities that can be treated as a single unit. One component entity will be assigned as the root.
Any references from outside the aggregate should only go to the root.  The root will maintain integrity.

Transactions do not cross aggregate boundaries.

Aggregates are the basic element of data transfer objects.  

Aggregates are not 'collections' but they may refer to one or more collections.

***Messages*** are Addressed to Aggregates: Each Aggregate talks to other aggregates by sending a message to its address.
I.e. the unique id of the aggregate.  Do not make any assumptions about where other aggregates 'live'.

Aggregate represents the disjoint set of data.  Don't let Aggregates share actual entities.

Event-Streams are mapped to Aggregates.

## Domain Concepts

***Value Objects*** define data schema and validation.  Consider Value Objects as holders of unique identity.  Immutable.

***Entities*** exist as a ***Value Object*** instance with a lifecycle and Persistence. Entity design should be focussed
on being a Value Object container/identifier. Mutable. In fact the object underlying the reference identification can
not only change data but type. The 'payload' could ultimately be very different from its origins. History log can help
here when necessary.

***Aggregates*** are a cluster of entities (not necessarily connected) that can be represented as a unit.

## Monoids

combine, append, merge, or add.

## Domain Events, Event Store, Commands that alter Aggregates. Pg. 216

## Services

A ***Service*** in the domain is a stateless operation that fulfills a domain-specific task.

Services as an alternative to methods on an Aggregate or Value Object.

A Domain Houses business logic, and Application Service does not.

Use Domain Services to:

 - Perform Significant Business Processes
 - Transform a Domain Object from one composition to an other (update schema)
 - Calculate a Value requiring data from several domain objects at the same time.

Ensure the service is stateless.

## Domain Events Chapt 8

See figure on Pg. 287 for some conceptual design.

Aggregates create events and publish them.

When Events orriginate with a Command on an Aggregate it's important to reflect the paste tense in the Event Name.

Avoid exposing the Domain Model to any messaging infrastructure.  Instead the Observer or Pub/Sub patters can be exposed
to 'outer layers' which can handle transferance to infrastructure messaging channels.

Aggregates tend to publish Domain Events; Application Services (sometimes Domain Services) tend to subscribe to them.

Event Stores for the Win.  See fig 8.3 on Page 309 for inspiration.

Typical Event Store Methods:

    append
    objectSerializer.serialize
    event metadata
    session.save(event)

See 'Forwarding Stored Events' when remote consistancy is necssary.

## Modules

In DDD Modules serve as containers for object classes that are highly cohesive with one another.

## Aggregates

Avoid aggregates just for the sake of compositional convenience.

Aggregates protect invariants and include central business logic.

Aggregates form a natural transaction boundary around other domain objects.

Limit modification to one Aggregate instance per transaction.

Keep Aggregates 'small'. Limit them to the just the Root Entity and a minimal number of properties. Use Aggregated to
maintain consistency between related attributes.

Aggregates can message other aggregates but they mustn't hold object references. This prevents immediate update of
relative aggregates based on a source aggregate command. However, you should simply use eventual concurrency by sending
a message and relying on the relative aggregates getting caught up eventually.

***Note***: Law of Dementor, Tell Don't Ask.

Dependency injection of a Repository, Domain Service or other outer layer into an Aggregate should be viewed as harmful.

Look up Aggregate Dependencies before invoking a command and pass them in as arguments.

## Factories

See table 11.1 on pg 391 for an example decomposion and usage of Factories on Aggregate Roots.

Factory methods can often look like commands.  E.g. registerUser(), post(),  scheduleRelease() etc.

## Repositories

Aggregates are persisted in repositories.  Repositories and Aggregates have a 1-1 relationship.

If you alter an aggregate after retrieval, its should be updated in the repository automatically.

Repositories create the illusion of in memory collections of Aggregate types.  They also behave as factories returning the 
fully formed objects of those items they are asked to save, however with any new metadata such as id.

Persistence mechanisms to support:

- **Implicit Copy-on-Read** is similar to ReactDOM or Immer drafts. On Object read the store maintains a copy of the
  retrieved data structure. When a 'transaction is committed' (i.e. any function that alters the structure state) then
  the persistance and flushes all necessary changes to the store.

- **Implicit Copy-on-Write** The persistence layer passes a proxy data structure/object. When methods are invoked which
  alter the proxy, it is marked as 'dirty'.  When committed all objects marked as `dirty` are flushed to the store.

These mechanisms provide persistence updates without exposing any persistence methodology or API to the consumer.

Another added advantage to this model is that it provides an obvious place (architecturally) to maintain Event-Sourcing
history.

Define the persistence interface in the same 'Module' as Aggregate type it supports. This interface however will of
course be implemented in a Provider.

Design repositories as collections.  E.g. methods of `add()`, ...

Repositories are likely to need a 'session'.

A lot of the above comments refelct the use of a RDBMS store.  When using NoSQL (e.g. Key Value) we will need to explicitely
call methods such as `save()` or `put()`.

However if you implement some object history in the NoSQL store this limitation could be overcome.  And depending on your 
specfic requirements, it may not be a limitation in any case.

Often your save() or put() functions will be worrying about serialization of the object. Whereas with the RDBMS and an
ORM you can leverage a Unit of Work pattern to queue up the changes.

Repositories also often provide some statistical or analytical methods.  E.g. count(), etc.

Appication Layers can be used to handle transactions.  The Domain Layer should be pump and dump.


## Integrating Bounded Contexts

This chapter primarily addresses bounded contexts that are served in different processes / on different systems all
together. However, if we need more bounded contexts in our application, the core principle is to always communicate
through messaging and Context Maps.

Follow the Principles of Distributed Computing:

- Networks are **not** reliable.
- There is always some latency, sometimes quite a lot.
- Bandwidth is not infinite.
- The network is not secure.
- Network topologies are dynamic and change often.
- Knowledge, policy and processes are spread across multiple administrators.
- Network transport has an associated cost.
- The network is heterogeneous.

## Integration Using Messaging

## Process State Machines and Time-out Trackers

## Application

The Domain Model is usually consumed in the heart of an ***application***. Applications will have something that can be
described as a User Interface (e.g. consider a cli or web api/REST interface a user interface). 

Application Services will coordinate use case tasks, manage transactions, and assert authorizations.

Application Services will usually rely on enterprise platform-specific infrastructural support.

The implementation details will generally include the facilities of...

- component container
- application management
- messaging
- and persistence.

## User Interface

The variance, scope and functionality of different UI technologies is far beyond the context of these notes. Instead, we
will focus on the common challenges that we will always face.

Rendering Domain Objects onto the User Interface.

Rendering Domain Object changes onto the User Interface.

UI elements will often require more information than the Domain Model tasks.  e.g. a User may need more information than the Domain Model object
to inform decisions on what actions to take.  Therefor ViewModels are often more complex and often collect data from several independent aggregate objects.

However, actions should still only impact one aggregate object at a time.

A common solution is to use Data Transfer Objects (ViewModels) to serialize the Aggregates into something like message
data. When your UI and Domain on on the same system you can usually bypass the extra complexisty of specific DTOs and
simply provide serializations to the renderer.

The Aggregate can implement a Publication system or Mediator pattern which the Aggregate publishes state to.

Don't force clients to understand the internals of your Aggregates. Instead provide serializations that can be minimized
into ViewModels / ApplicationState.

Consider bypassing Aggregate collections and instead provide UseCaseQueries that are Domain specific and that can
directly query repositories and return Value Object compositions reflecting the necessary data.

When dealing with mutiple disperate client types, consider the ***Data Transformer*** pattern.

The Presentation Model pattern can be used to present all necessary data to the UI (like Application State) allowing the
Views to render themselves.  ***Very Reacty***  The Presentation Model is then responsible for aggregating all necessary
data for the views removing it from the Domain Model.

The Presentation Model also manages User response and feeds that back into the Application / Domain services for
processing. Preferably as a Command function. However be mindful that your Presentation Model doesn't start taking
responsibilities away from Application Services. It should be as thin a translation layer as possible.

## Application Services

The Application Services are the direct clients of the Domain (Domain Services).  They manage use case flows (one Service per flow),
transactions (if appropriate) and that model state transitions are persisted.  ***Earlier we noted that Aggregates would be responsible for state transition persistance.  INvestigate further***.

Application Services also usually look after securty, Authorization, ACLs etc.

Application Services are often thin routers simply managing translation from ViewModel / UI transactions to the Domain.

It's also possible to design Application Services after Ports and Adapters. The Application Service would then just
register itself with the appropriate Domain Service, Messaging or Event systems and process update accordingly.

## Aggregates and Event Sourcing

Represent the entire state of Aggregates through a series of Events. These can then be used to create materialized views
that represent the current full state of the Aggregates.

Events are captured in an append-only Event Stream.  Events are persisted in an Event Store indexed by Root Entity ids.

Benefits:

- State history and the motivation for all change is capture in perpetuity. This often provides unforseen operational
  benefits in later analysis.
- Append only is extremely performant and facilitates many data distribution models.
- Event-centric Aggregate design focuses attention more on behaviors than data and avoids the potential impedence
    mismatch between domain and persistance models.

Drawbacks:

- Sensible definition of Domain Events requires deep understanding of the Business Domain.  This is usually only
  cost-effective when the potential operational benefits are obvious.
- Requires experienced development teams to implement well.
- Implementation usually requires some form of CQRS which is a notably advanced development paradigm.

See figure A.2 on page 541 for a diagram of the flow.

1. Client calls application service.
2. Aggregate State is build from its current Event Stream.
3. Call Aggregate business method passing in parameters from the Application Service and Domain Services as needed.
4. Commit the new events to the Event Store for persistence.
5. Publish new events to all subscribers.

Review pages 548-549 for a more detailed discussion of the whole flow.

## Command Handlers

Command Handers are often implemented by serializing the appriate data along with a string representing the Command to
be applied. So command objects are designed to be serialized and handed off to the handlers. Command Handlers
effectively replace methods in the Application Services.

Command Handler models provide simple distribution of load across many horizontal handlers.

Command Handlers also provide *temporal decoupling* between the client and Application Services. E.g. a client will not
be blocked if a service is slow or unavailable.


## Implementing an Event Store

...

## Event Sourcing in Functional Languages

Page 583 wraps up the book very nicely. Basically it says that functional paradigms with Command / Event Sourcing
eliminates the need for about 300 of the prior pages. :-)








