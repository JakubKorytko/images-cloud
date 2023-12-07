import { Request, Response } from "express";
const path = require("path");
// import Folders from "../utils/folders.util";
// const folders = require("../utils/folders.util");
const users = require("../utils/users.util");

const usersDatabase = async (req: Request, res: Response) => {
    const usersArray = await users.getAll();
    res.render(path.join(__dirname + "/../services/database/database.ejs"), {users: usersArray});
}

module.exports = usersDatabase;