import faker from 'faker';

import { UserController } from './user/UserController';

(async () => {
  const user = new UserController();

  const fromCreate = await user.create({
    birth: faker.date.past(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  });

  const fromShow = await user.show(fromCreate.id);

  const fromList = await user.list();

  const fromUpdate = await user.update(fromCreate.id, {
    name: faker.name.findName(),
  });

  await user.delete(fromList[0].id);

  console.log({ fromCreate, fromShow, fromList, fromUpdate });
})();
