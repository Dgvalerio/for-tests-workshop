import { TaskController } from '../../../src/task/TaskController';

const sut = new TaskController();

describe('TaskController', () => {
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
