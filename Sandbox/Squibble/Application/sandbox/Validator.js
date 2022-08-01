import Ajv from 'ajv/dist/2020.js'
import addFormats from "ajv-formats"
import  $RefParser from "json-schema-ref-parser";

import Entity from './Schema/Entity.json' assert { type: 'json' }
import Action from './Schema/Action.json' assert { type: 'json' }
import Application from './Schema/Application.json' assert { type: 'json' }
import User from './Schema/User.json' assert { type: 'json' }
import Ticket from './Schema/Ticket.json' assert { type: 'json' }
import Project from './Schema/Project.json' assert { type: 'json' }

const Schemalist = [ Entity, Action, Application, User, Ticket, Project  ]

const ajv = new Ajv()
addFormats( ajv )
ajv.addSchema( Schemalist )
