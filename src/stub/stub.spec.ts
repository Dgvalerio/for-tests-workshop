import { makeDummyUser, makeDummyUsers } from '../collaborators';
import { User } from '../types/user';

/**
 * Example of DatabaseFake
 * @module DatabaseFake
 * */
class DatabaseFake {
  /**
   * method to simulate a get request
   * @param {string} path - rota da api.
   * @return {any}
   * */
  public static async get(path: string) {
    if (path === 'users') return makeDummyUsers();
    else return [];
  }

  /**
   * method to simulate a post request
   * @param {string} path - rota da api.
   * @param {Object} data - data do post in request.
   * @return {any}
   * */
  public static async post(path: string, data: Object) {
    return data;
  }
}

/**
 * Example of Validator
 * @module Validator
 * */
class Validator {
  /**
   * method to validate if the entered field was entered
   * @param {Object} object - object of field.
   * @param {string} fieldName - name of field to be validated.
   * @return {boolean}
   * */
  public requiredField(
    object: { [key: string]: any },
    fieldName: string
  ): boolean {
    return !!(object[fieldName] && object[fieldName].trim().length > 0);
  }

  /**
   * method to validate if the entered field is unique
   * @param {Object} object - object of field.
   * @param {string} fieldName - name of field to be validated.
   * @return {Promise<boolean>}
   * */
  public async uniqueField(
    object: { [key: string]: any },
    fieldName: string
  ): Promise<boolean> {
    const users = await DatabaseFake.get('users');

    return !users.filter(
      (user) => (user as any)[fieldName] === object[fieldName]
    );
  }

  /**
   * method to validate if the entered CPF is valid
   * @param {Object} object - object of field.
   * @param {string} fieldName - name of field to be validated.
   * @return {Promise<boolean>}
   * */
  public async cpfIsValid(
    object: { [key: string]: any },
    fieldName: string
  ): Promise<boolean> {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(object[fieldName]);
  }
}

/**
 * Example of Validator Stub
 * @module Validator
 * */
class ValidatorStub implements Partial<Validator> {
  /**
   * method to validate if the entered field was entered
   * @param {Object} object - object of field.
   * @param {string} fieldName - name of field to be validated.
   * @return {boolean}
   * */
  public requiredField(
    object: { [key: string]: any },
    fieldName: string
  ): boolean {
    return true;
  }

  /**
   * method to validate if the entered field is unique
   * @param {Object} object - object of field.
   * @param {string} fieldName - name of field to be validated.
   * @return {Promise<boolean>}
   * */
  public async uniqueField(
    object: { [key: string]: any },
    fieldName: string
  ): Promise<boolean> {
    return true;
  }
}

/**
 * Example of User Controller
 * @module UserController
 * */
class UserController {
  public validator: Validator;

  /**
   * Constructor of UserController
   * */
  constructor() {
    this.validator = new Validator();
  }

  /**
   * Method to create a Generic
   * @param {Object} user - user to register.
   * @return {Object}
   * */
  public async registerUser(user: User): Promise<User> {
    if (!this.validator.requiredField(user, 'email'))
      throw new Error('Email is required!');
    if (!this.validator.requiredField(user, 'name'))
      throw new Error('Name is required!');
    if (!(await this.validator.uniqueField(user, 'email')))
      throw new Error('Email must be unique!');

    return (await DatabaseFake.post('users', user)) as User;
  }
}

const makeSut = () => {
  const validator = new ValidatorStub();
  const sut = new UserController();
  sut.validator = validator as Validator;

  return { sut };
};

describe('UserController', () => {
  it('should register a user', async () => {
    const { sut } = makeSut();
    const user = makeDummyUser();

    const result = await sut.registerUser(user);

    expect(result).toBeDefined();

    console.table(result);
  });
});
