import { entity } from './Entity.js';
import { faker } from '@faker-js/faker';

export const generate = () => ({
  ...entity(),
  resource: '/User',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email()
});

export const user = generate;
