import { nanoid } from 'nanoid';
import { loremIpsum } from "lorem-ipsum";

export const generate = () => {
  const date = new Date().toISOString();
  return {
    _id: '/Project/' + nanoid(),
    resource: '/Project',
    created_on: date,
    updated_on: date,
    ticket_id: 'PMGT_' + Math.floor( Math.random() * ( 9999 - 1000 + 1 ) + 1000 ),
    summary: loremIpsum(),
    assigned_to: '/User/' + nanoid()
  };
};

export const project = generate;
