import * as faker from 'faker';

import { Task } from '../../../src/task/Task';
import { TaskController } from '../../../src/task/TaskController';
import { makeTask } from './utils/makeTask';

const makeSut = (): TaskController => new TaskController();

describe('TaskController', () => {
  it('should be defined', () => {
    const sut = makeSut();

    expect(sut).toBeDefined();
  });

  it('should create a task', async () => {
    const sut = makeSut();

    // Obtendo dados de antes da criação
    const listBeforeCreate = await sut.list();
    const sizeBeforeCreate = listBeforeCreate.length;

    // Criando a task
    const createdTask: Task = await sut.create(makeTask());

    // Obtendo dados de depois da criação
    const listAfterCreate = await sut.list();
    const sizeAfterCreate = listAfterCreate.length;

    // Verificando se os do dados mudaram conforme a deveriam
    expect(sizeAfterCreate).toEqual(sizeBeforeCreate + 1);

    const findAfterCreate = listAfterCreate.find(
      ({ id }) => id === createdTask.id
    );

    expect(createdTask).toEqual(findAfterCreate);
  });

  it('should return a list of tasks', async () => {
    const sut = makeSut();

    await sut.create(makeTask());

    const result: Task[] = await sut.list();

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length > 0).toBeTruthy();
  });

  it('should return a task', async () => {
    const sut = makeSut();

    const createdTask: Task = await sut.create(makeTask());

    const result: Task = await sut.show(createdTask.id);

    expect(result).toBeDefined();
    expect(result).toEqual(createdTask);
  });

  it('should update a task', async () => {
    const sut = makeSut();

    const createdTask: Task = await sut.create(makeTask());

    const newDescription = faker.random.words();

    const result: Task = await sut.update(createdTask.id, {
      description: newDescription,
    });

    expect(result).toBeDefined();
    expect(result).toEqual({ ...createdTask, description: newDescription });
  });

  it('should delete a task', async () => {
    const sut = makeSut();

    const createdTask: Task = await sut.create(makeTask());

    const listBeforeDelete = await sut.list();
    const sizeBeforeDelete = listBeforeDelete.length;

    await sut.delete(createdTask.id);

    const listAfterDelete = await sut.list();
    const sizeAfterDelete = listAfterDelete.length;

    expect(sizeAfterDelete).toEqual(sizeBeforeDelete - 1);

    const findAfterDelete = listAfterDelete.find(
      (oneTask) => oneTask.id === createdTask.id
    );
    expect(findAfterDelete).toBeUndefined();
  });
});
