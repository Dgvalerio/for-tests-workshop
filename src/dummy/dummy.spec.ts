import { makeDummyUser } from '../collaborators/makeUser';
import { User } from '../types/user';

// Function to sort users by name
const sortUsersByName = (users: User[]) =>
  users.sort((currentUser, nextUser) => {
    if (currentUser.name.toLowerCase() > nextUser.name.toLowerCase()) return 1;
    if (currentUser.name.toLowerCase() < nextUser.name.toLowerCase()) return -1;
    else return 0;
  });

// Dummy array of users
const dummyUsers: User[] = Array.from({ length: 10 }, () => makeDummyUser());

describe('Dummy Example', () => {
  it('should use a dummy and sort the users', () => {
    const out = sortUsersByName([...dummyUsers]);

    expect(
      out.every((item) => dummyUsers.includes(item)) &&
        dummyUsers.every((item) => out.includes(item))
    ).toBeTruthy();
    expect(out).not.toEqual(dummyUsers);
    expect(out).toHaveLength(dummyUsers.length);

    console.log('Before ordering:');
    console.table(dummyUsers);
    console.log('After ordering:');
    console.table(out);
  });
});
