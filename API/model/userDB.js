module.exports.postUser = async (login, password, client) => {
    return await client.query('SELECT * FROM user_account WHERE login = $1 AND password = $2', [login, password]);
}

module.exports.getUser = async (id, client) => {
    return await client.query("SELECT * FROM user_account WHERE id = $1", [id]);
}

module.exports.registerUser = async (lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password, client) => {
    return await client.query("INSERT INTO user_account (last_name, first_name, email_address, birthDay, blood_type, login, password) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [lastname, firstname, emailAddress, birthDay, bloodTypeId, login, password]);
}