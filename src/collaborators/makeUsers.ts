// Dummy array of users
import { User } from '../types/user';
import { makeDummyUser } from './makeUser';

export const makeDummyUsers = (): User[] =>
  Array.from({ length: 10 }, () => makeDummyUser());
