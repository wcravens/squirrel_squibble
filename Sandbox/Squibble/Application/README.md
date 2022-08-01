# Squibble Application

The 'application' provides the inner workings of the system.

App: Handles system orchestration and providing the interfaces for inbound and outbound actions.

Core: Validates all Entity CRUD.  This is central business information, 

Config: really a combo of things like traditional configuration (part user and part system) and current application
state for the functional elements outside of core. See it as the Core for system state rather than entity state.