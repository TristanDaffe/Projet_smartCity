const { compareHash } = require("../utils/hash");

module.exports.loginUser = async (login, password, client) => {
    const users = await client.query('SELECT * FROM user_account WHERE login = $1', [login]);
    const user = users.rows[0];

    if(user !== undefined && user.is_admin && await compareHash(password, user.password)) {
        return {userType: "admin", value: user};
    }
    else if (user !== undefined && await compareHash(password, user.password)) {
        return {userType: "user", value: user};
    }
    else {
        return {userType: "unknown", value: null};
    }
}

module.exports.getUser = async (id, client) => {
    return await client.query("SELECT * FROM user_account WHERE id = $1", [id]);
}
module.exports.getUserByLogin = async (login, client) => {
    return await client.query("SELECT * FROM user_account WHERE login = $1", [login]);
}
module.exports.getUserByMail = async (emailAddress, client) => {
    return await client.query("SELECT * FROM user_account WHERE email_address = $1", [emailAddress]);
}

module.exports.getAllUsers = async (client) => {
    return await client.query(`SELECT user_account.id, user_account.last_name, user_account.first_name, user_account.email_address, user_account.birthday, 
    blood_type.type, blood_type.rhesus,
    user_account.login, user_account.password, user_account.is_admin
    FROM user_account
    INNER JOIN blood_type ON user_account.blood_type = blood_type.id
    ORDER BY user_account.id`);
}

module.exports.registerUser = async (lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password, client) => {
    try{
        await client.query("BEGIN");
        await client.query("INSERT INTO user_account (last_name, first_name, email_address, birthday, blood_type, login, password) VALUES "+
        "($1, $2, $3, $4, $5, $6, $7)", [lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password]);
        const user = await client.query("SELECT * FROM user_account WHERE login = $1", [login]);
        await client.query("COMMIT");
        return {userType: "user", value: user.rows[0]};
    }
    catch(e) {
        await client.query("ROLLBACK");
        throw e;
    }
}

module.exports.updateUser = async (id, lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password, client) => {
    await client.query("UPDATE user_account SET last_name = $1, first_name = $2, email_address = $3, birthday = $4, blood_type = $5, login = $6, password = $7 WHERE id = $8", 
    [lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password, id]);
    const {rows:users} = await client.query("SELECT * FROM user_account WHERE login = $1", [login]);
    const user = users[0];
    console.log(user)
    if (user !== undefined ) {
        return {userType: "user", value: user};
    }
    else {
        return {userType: "unknown", value: null};
    }
}

module.exports.updateUserWithoutPassword = async (id, lastname, firstname, emailAddress, birthDay, bloodTypeId, login, client) => {
    await client.query("UPDATE user_account SET last_name = $1, first_name = $2, email_address = $3, birthday = $4, blood_type = $5, login = $6 WHERE id = $7",
    [lastname, firstname, emailAddress, birthDay, bloodTypeId, login, id]);
    const user = await client.query("SELECT * FROM user_account WHERE login = $1", [login]);
    if (user !== undefined ) {
        return {userType: "user", value: user};
    }
    else {
        return {userType: "unknown", value: null};
    }
}

module.exports.deleteUser = async (id, client) => {
    await client.query("BEGIN");
    try{
        await client.query("UPDATE donation SET user_id = NULL WHERE user_id = $1", [id]);
        await client.query("DELETE FROM user_account WHERE id = $1", [id]);
        await client.query("COMMIT");
    }
    catch(e) {
        await client.query("ROLLBACK");
        throw e;
    }
}

module.exports.loginExist = async (login, client) => {
    const loginDB = await client.query("SELECT login FROM user_account WHERE login = $1", [login]);
    return loginDB.rows[0] !== undefined;
}

module.exports.emailExist = async (email, client) => {
    const emailDB = await client.query("SELECT login FROM user_account WHERE email_address = $1", [email]);
    return emailDB.rows[0] !== undefined;
}

