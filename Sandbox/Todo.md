# Trying to organize some todo lists

## Currently

Register Application and Create a Store
  - Explore PouchDB API and Paradigms
  - Load PouchDB if appropriate
  - Test for Application Store, we know this will fail.
  - Register the Application
  - Initialize Storage
  - Store App Registration Info
  - Pass to Registration Screen

## Design Concepts

- Reduce DDD concepts into minimal Functional components
- Decompose Layers and Components
- Decompose Domain Business Logic, Event Sourcing and Command Services
- Document / Identify expected Pure vs Impure Function Components
  - Outer 'ring' of architecture contains all of the impure functions needed to provide interaction

## Proof of Concepts

- Events to Console
- Immutability
- Pub/Sub Brokers
- LocalStorage in Node.js
- Document Store with 'LocalStorage' API

- Config File/ Immutable CONFIG

### Repository

- JSON Schema Validation
- definitions
- versioning
- validator

- Eventual Consistency
- MVCC


- Memoization in Repository Persistence functionality
- Download Application State as an ASCII JSON document
- Download Document State ""
- Download Document Markdown
- Download Document HTML
- Testing Framework
  - [Jest](https://jestjs.io/docs/en/getting-started) for React App
  - Mocha + Chai for Domain Modules
- Dynamic analysis with [Flame Graphs](https://nodejs.org/en/docs/guides/diagnostics-flamegraph/)
- [PouchDB](https://github.com/pouchdb/pouchdb)
- Containerized Server
- View Router
 
## Development Tools
- ESLint

## Completed
- Render Application Information in Footer
  - Application Build ID from git commit hash
  - Application Metadata in JSON File (Name, BuildQuality, etc)
