module.exports.getUserFromLogin = async (login, password, client) => {
    return await client.query('SELECT * FROM user_account WHERE login = $1 AND password = $2', [login, password]);
}

module.exports.getUser = async (id, client) => {
    console.log('user', id);
    return await client.query("SELECT * FROM user_account WHERE id = $1", [id]);
}