import { Request, Response } from 'express';

import folders from 'utils/folders.util';
import users from 'utils/users.util';

const addUser = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(500).send('No data passed');
    return false;
  }
  const { username } = req.body;
  const { password } = req.body;
  if (username.length < 6 || username.length > 20) {
    res.status(500).send('Username must be longer than 6 characters and shorter than 20 characters');
    return false;
  }

  // _test* usernames are reserved for testing!

  if (username.startsWith('_test') || username.search(/^[a-zA-Z0-9_]*$/) !== 0) {
    res.status(500).send('Username is illegal (use only letters and numbers)');
    return false;
  }
  if (password.length < 6 || password.length > 50) {
    res.status(500).send('Password must be longer than 6 characters and shorter than 50 characters');
    return false;
  }
  let folderCreated: boolean = false;
  const userAddedToDatabase: boolean = await users.addUser(username, password);
  if (userAddedToDatabase) folderCreated = folders.create(username);
  if (folderCreated && userAddedToDatabase) res.status(200).send('User added');
  else if (!userAddedToDatabase) res.status(500).send('User exists');
  else {
    res.status(500).send(`User doesn't exists but folder does (/src/images/${username})`);
    return false;
  }

  return true;
};

export default addUser;
