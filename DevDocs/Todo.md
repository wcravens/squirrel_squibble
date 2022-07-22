# Trying to organize some todo lists

## Currently

[x] - Register Application and Create a Store
[x]   - Explore PouchDB API and Paradigms
[x]   - Load PouchDB if appropriate
[x]   - Test for Application Store, we know this will fail.
[x]   - Register the Application
[x]   - Initialize Storage
[x]   - Store App Registration Info
[ ]   - Pass to Registration Screen

## Design Concepts

[x]- Reduce DDD concepts into minimal Functional components
[x]- Decompose Layers and Components
[x]- Decompose Domain Business Logic, Event Sourcing and Command Services
[x]- Document / Identify expected Pure vs Impure Function Components
[x]  - Outer 'ring' of architecture contains all of the impure functions needed to provide interaction

## Proof of Concepts

[x] - Events to Console
[x] - Immutability
[x] - Pub/Sub Brokers
[x] - LocalStorage in Node.js
[x] - Document Store with 'LocalStorage' API

- Config File/ Immutable CONFIG

### Repository

[ ] - JSON Schema Validation
[ ] - definitions
[ ] - versioning
[ ] - validator
[ ] - Eventual Consistency
[ ] - MVCC
[ ] - Memoization in Repository Persistence functionality
 
[ ] - Download Application State as an ASCII JSON document
[ ] - Download Document State ""
[ ] - Download Document Markdown
[ ] - Download Document HTML
 
- Testing Framework
  - [Jest](https://jestjs.io/docs/en/getting-started) for React App
  - Mocha + Chai for Domain Modules
- Dynamic analysis with [Flame Graphs](https://nodejs.org/en/docs/guides/diagnostics-flamegraph/)
- [PouchDB](https://github.com/pouchdb/pouchdb)
- Containerized Server
- View Router
 
## Development Tools
[x] - ESLint

## Completed
[x] - Render Application Information in Footer
[x]   - Application Build ID from git commit hash
[x]   - Application Metadata in JSON File (Name, BuildQuality, etc)