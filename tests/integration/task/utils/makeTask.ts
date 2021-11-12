import faker from 'faker';

import { Task } from '../../../../src/task/Task';

export const makeTask = (withId?: boolean): Task | Omit<Task, 'id'> => {
  const task = {
    description: faker.random.words(),
    owner: faker.random.alphaNumeric(),
    title: faker.random.words(),
  };

  return withId ? { id: faker.random.alphaNumeric(), ...task } : task;
};
