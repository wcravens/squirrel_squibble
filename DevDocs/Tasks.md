## Tasks

Project/CRUD

ScopeGroup/CRUD
  Associates:
    Assumptions/CRUD
    Constraints/CRUD
    Risks/CRUD

ScopeItem/CRUD

ScopeItem/create?outOfScope=true

ScopeItem/changeScopeGroup
  
ScopeItem/toggleOutOfScope


ScopeGroupRelationship/CRUD
ScopeItemRelationship
ScopeItem/dependencies

# Dummy BTR GCP - IA


# Task Oriented view of IA Authoring

- Create Projects
- Create scope groups
- add/create scope items (in and out of scope)
- Edit Scope Items outside of project context
- Manage dependencies between scope groups[?]
- Move scope item from one scope group to an other
- ScopeItem/toggle between in and out of scope.
- Create Contemporary ScopeGroups; Scope groups, possibly in seperate projects, that have a
  programme target or delivery together.
- Move ScopeGroups, and associated information between projects.
- Reference for items that are explicitly not included in a scope group.
- Dependencies between ScopeGroups[?]
- Add new ScopeItem Header (rapid capture of top level scope)
- Add new ScopeItem RichText detail section

## Solutioning

Create 'solution_impact_flocks'
Create feasability choices
Create impacts

## Navigation
Navigate to items associated with ScopeItems/Groups; Assumptions, Constraints, Risks,
Dependancies, solutionElements.
Quick Navigation of Document Sections/top level structure.
Move Scope from one Project to an other with all of its associates.
UI for new actions
Create IA from Project

## UX Functionality





# APM Tools Technical Architecture Proposal

## Impact Assessment Editor
RichTextArea Editors
Structured Document (possibly via markup)
Autocomplete to support adding references to:
  - Apps
  - Components
  - Dependent Projects
    - Potentially IA items within other projects
  People
  - Data Flows
  - Reference Architecture, solution architectures, patterns; Catalog
@Mention functionality
Referencial Integrity Audit
Autoatically generate realationships between associated data in the IA and populate accordingly.
Auto-Generate the impact summary table
Integration of Diagrams
Hyperlinks
Itegration with Jira API
Maintain Change History (Author, date, change, etc)
Allow Time Travel on data/events
Add new documents
Edit existing documents
Support for 'impactlets' IA-Lite Documents
Work offline, auto upload when reconnected
  - Local Store
  - Eventual Consistancy Model
  - Service Workers
  - Etc
Export Current Document as Data?
Upload saved Document Data?
Publish Document, Confluence, API or Simple Transfer (e.g. Copy-Pasta)

## Feature request Impact Assessment Editor
Ability to switch between 'feature perspective' and 'solution perspective' while editting
Feature Perspective; easily switch between these views (e.g. tabs):
  1. ScopeHeaders and DetailedTextArea
  2. Related out of scope items
  3 dependency features from other projects
  4. assumption including conjoined features in other projects that are either both be built or
     neither be built.
  5. Technical Solution section wiht app and optionally component impacts
Solution Perspective:
  Technical solutions for all features in the project; simple navigation between them
Scope Perspective:
  For quickly generating several features to build scope for a project early on
? Wiki style links back to Confluence, mitigating against breakage when a page gets renamed
Anchors in Confluence
Permalinks for Confluence
Attatch Comments to any item
Navigate through comments (similar to Confluence inline comments)
Open items list that can be anchored to specific locations in the document.
URL#Fragements to Document Sections

## Feature Requests for Projects / IAs
Query historical and current projects to find technical impacts by component.
Query Historical and current projects to find impacts by system.

## Diagram / Enterprise Architecture Editor (bettern interface for Alphabet)

*Currently this section is out of scope.*

# APM Process Support Tools

Increase value and efficiency

Rapid capture of scope as an "information architecture" where the technical solution can be
written with the following  qualities:

1. Elements of the solution can be expressed as information lifecycle flows that are traceable
   to scope items.
2. Elements of the solution implicitely decompose in a starrd way to "Business Value Deliverables"
   used by E&E to manage execution.
3. Diagrams can be generated in a stard way based on existing and proposed 'APP-" and "COML-"
   entries in Alfabet.


Conventionalize the structure of an IA and authoring style and practices to share high level
vision for how IA comes together.
POC Something to help sell and explain the idea to our peer group.






 


