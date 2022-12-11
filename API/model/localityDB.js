module.exports.getLocality = async (id, client) => {
    return await client.query("SELECT * FROM locality WHERE id = $1", [id]);
}

module.exports.getAllLocalities = async (client) => {
    return await client.query("SELECT * FROM locality");
}

module.exports.createLocality = async (name, postalCode, client) => {
    await client.query("INSERT INTO locality (name, postal_code) VALUES ($1, $2)", [name, postalCode]);
}

module.exports.updateLocality = async (id, name, postalCode, client) => {
    await client.query("UPDATE locality SET name = $1, postal_code = $2 WHERE id = $3", [name, postalCode, id]);
}

module.exports.deleteLocality = async (id, client) => {
    await client.query("DELETE FROM locality WHERE id = $1", [id]);
}