# Trying to organize some todo lists

## Design Concepts

- Reduce DDD concepts into minimal Functional components
- Decompose Layers and Components
- Decompose Domain Business Logic, Event Sourcing and  Command Services
- Generic Modularization of Codebase.  E.g. Domain should be separate from UI
- Document / Identify expected Pure vs Impure Function Components
  - Outer 'ring' of architecture contains all of the impure functions needed to provide interaction

## Proof of Concepts

- Events to Console
- LocalStorage in Node.js
- JSON Schema Validation
- Immutability
- Pub/Sub Brokers
- Document Store with 'LocalStorage' API
- JSON Schema definitions
- JSON Schema validator
- Messaging Subsystem; Conceptual Design and Implementation details
- Render Application Information in Footer
    - Application Build ID from git commit hash
    - Application Metadata in JSON File (Name, BuildQuality, etc)
- Event Store
  - Eventual Consistency
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

## Bundling (i.e. [Webpack](https://webpack.js.org/))

- Bundle Application Metadata
  - application_name, version, build_quality, build_id (current git commit hash)


