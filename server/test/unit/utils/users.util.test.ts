const Usrs = require("../../../src/utils/users.util");

test("Signing in should work if data is valid", async () => {
    const userData = {
        valid: {
            username: "_testuser",
            password: "qwerty123"
        },
        invalid: {
            username: "_usertest",
            password: "321ytrewq"
        }
    };

    const shouldWork = await Usrs.loginUser(userData.valid.username, userData.valid.password);    
    const shouldntWork = await Usrs.loginUser(userData.invalid.username, userData.invalid.password);

    expect(shouldWork).toBeTruthy();
    expect(shouldntWork).toBe(false);
})

test("Should be able to get all users", async () => {
    const users = await Usrs.getAll();

    const usernames = users.map((user: {id: number, username: string, password: string}) => {return user.username})

    expect(usernames).toContain("_testuser");
})

test("Should be able to check if user exists", async () => {
    const shouldExist = await Usrs.userExists("_testuser");
    const shouldntExist = await Usrs.userExists("_usertest");

    expect(shouldExist).toBe(true);
    expect(shouldntExist).toBe(false);
})


//not checking deleting and adding users as it could make mess with IDs in table very fast
//it also depends on other functions that are checked here and prepared queries