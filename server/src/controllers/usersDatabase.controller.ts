import path from 'path';

import { Request, Response } from 'express';

import users from 'utils/users.util';

const usersDatabase = async (_: Request, res: Response) => {
  const usersArray = await users.getAll();
  res.render(path.join(`${__dirname}/../services/database/database.ejs`), { users: usersArray });
};

export default usersDatabase;
