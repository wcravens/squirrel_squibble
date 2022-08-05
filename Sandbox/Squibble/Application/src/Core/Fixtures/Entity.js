import { nanoid } from 'nanoid';

export const generate = () => ({
  _id: nanoid(),
  created_on: new Date().toISOString()
});

export const entity = generate;
