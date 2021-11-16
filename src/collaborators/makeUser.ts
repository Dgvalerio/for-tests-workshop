import faker from 'faker';

import { User } from '../types/user';

// Function to create a dummy user
export const makeDummyUser = (): User => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
});
