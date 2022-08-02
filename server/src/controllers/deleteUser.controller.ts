import { Request, Response } from "express";
// import Folders from "../utils/folders.util";
const folders = require("../utils/folders.util");
const users = require("../utils/users.util");

const deleteUser = async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(500).send("No data passed")
        return false;
    }
    const username: string = req.body.username;
    
    // if (username.length < 6 || username.length > 20) {
    //     res.status(500).send("Wrong username given")
    //     return false;
    // }

    let folderDeleted: boolean = false;
    const userDeletedFromDatabase: boolean = await users.deleteUser(username);
    if (userDeletedFromDatabase) folderDeleted = folders.delete(username);
    if (folderDeleted && userDeletedFromDatabase) res.status(200).send("User deleted")
    else res.status(500).send("User doesn't exists")
}

module.exports = deleteUser;