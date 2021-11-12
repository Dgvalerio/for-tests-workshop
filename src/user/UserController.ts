import { GenericController } from '../generic/GenericController';
import { User } from './User';

/**
 * Controller of User
 * @module UserController
 * */
export class UserController extends GenericController<User> {
  /**
   * Constructor of UserController.
   * Set route to '/user'.
   * */
  constructor() {
    super('user');
  }
}
