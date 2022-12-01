module.exports.postUser = async (login, password, client) => {
    const users = await client.query('SELECT * FROM user_account WHERE login = $1 AND password = $2', [login, password]);
    const user = users.rows[0];
    if(user !== undefined && user.is_admin && user.password === password) {
        return {userType: "admin", value: user};
    }
    else if (user !== undefined && user.password === password) {
        return {userType: "user", value: user};
    }
    else {
        return {userType: "unknown", value: null};
    }

}

module.exports.getUser = async (id, client) => {
    return await client.query("SELECT * FROM user_account WHERE id = $1", [id]);
}

module.exports.registerUser = async (lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password, client) => {
    await client.query("INSERT INTO user_account (last_name, first_name, email_address, birthday, blood_type, login, password) VALUES "+
    "($1, $2, $3, $4, $5, $6, $7)", [lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password]);
    
    return await this.postUser(login, password, client);
}