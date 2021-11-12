import { GenericController } from '../generic/GenericController';
import { Task } from './Task';

/**
 * Controller of Task
 * @module TaskController
 * */
export class TaskController extends GenericController<Task> {
  /**
   * Constructor of TaskController.
   * Set route to '/task'.
   * */
  constructor() {
    super('task');
  }
}
