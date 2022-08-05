import { entity } from './Entity.js';

export const generate = () => ({
  ...entity(),
  resource: '/Application',
  name:     'Squibbler',
  version:  '0.0.1',
  build_id: '123124815'
});

export const application = generate;
