import { Request, Response } from 'express';

import folders from 'utils/folders.util';
import users from 'utils/users.util';

const deleteUser = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(500).send('No data passed');
    return false;
  }
  const { username } = req.body;

  let folderDeleted: boolean = false;
  const userDeletedFromDatabase: boolean = await users.deleteUser(username);
  if (userDeletedFromDatabase) folderDeleted = folders.delete(username);
  if (folderDeleted && userDeletedFromDatabase) res.status(200).send('User deleted');
  else res.status(500).send("User doesn't exists");
  return true;
};

export default deleteUser;
