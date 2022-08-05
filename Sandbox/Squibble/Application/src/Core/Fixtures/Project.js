import { entity } from './Entity.js';
import { nanoid } from 'nanoid';
import { loremIpsum } from "lorem-ipsum";

export const generate = () => ({
  ...entity(),
  resource: '/Project',
  ticket_id: nanoid(),
  summary: loremIpsum(),
  assigned_to: nanoid()
});

export const project = generate;
