module.exports.getUserFromLogin = async (login, password, client) => {
    return await client.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password]);
}