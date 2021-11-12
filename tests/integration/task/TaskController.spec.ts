import * as faker from 'faker';

import { Task } from '../../../src/task/Task';
import { TaskController } from '../../../src/task/TaskController';

const sut = new TaskController();

const makeTask = (withId?: boolean): Task | Omit<Task, 'id'> => {
  const task = {
    description: faker.random.words(),
    owner: faker.random.alphaNumeric(),
    title: faker.random.words(),
  };

  return withId ? { id: faker.random.alphaNumeric(), ...task } : task;
};

describe('TaskController', () => {
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a task', async () => {
    const task = makeTask();

    const result: Task = await sut.create(task);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('owner');
    expect(result).toHaveProperty('title');
  });

  it('should return a list of tasks', async () => {
    const createdTask: Task = await sut.create(makeTask());

    const result: Task[] = await sut.list();

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length > 0).toBeTruthy();

    const findResult = result.find((oneTask) => oneTask.id === createdTask.id);

    expect(findResult).toBeDefined();
    expect(findResult).toEqual(createdTask);
  });

  it('should return a task', async () => {
    const createdTask: Task = await sut.create(makeTask());

    const result: Task = await sut.show(createdTask.id);

    expect(result).toBeDefined();
    expect(result).toEqual(createdTask);
  });

  it('should update a task', async () => {
    const createdTask: Task = await sut.create(makeTask());

    const newDescription = faker.random.words();

    const result: Task = await sut.update(createdTask.id, {
      description: newDescription,
    });

    expect(result).toBeDefined();
    expect(result).toEqual({ ...createdTask, description: newDescription });
  });

  it('should delete a task', async () => {
    const createdTask: Task = await sut.create(makeTask());

    const listBeforeDelete = await sut.list();
    const findBeforeDelete = listBeforeDelete.find(
      (oneTask) => oneTask.id === createdTask.id
    );

    const sizeBeforeDelete = listBeforeDelete.length;

    expect(findBeforeDelete).toEqual(createdTask);

    await sut.delete(createdTask.id);

    const listAfterDelete = await sut.list();
    const findAfterDelete = listAfterDelete.find(
      (oneTask) => oneTask.id === createdTask.id
    );

    const sizeAfterDelete = listAfterDelete.length;

    expect(findAfterDelete).toBeUndefined();
    expect(sizeAfterDelete).toEqual(sizeBeforeDelete - 1);
  });
});
