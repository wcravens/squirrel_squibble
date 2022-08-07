import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';

export const generate = () => {
  const date  = new Date().toISOString();
  const first = faker.name.firstName();
  const last  = faker.name.lastName();
  return {
    _id: '/User/' + nanoid(),
    resource: '/User',
    created_on: date,
    updated_on: date,
    first_name: first,
    last_name: last,
    email: faker.internet.email( first, last )
  };
};

export const user = generate;
