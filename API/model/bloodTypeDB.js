module.exports.getBloodType = async (id, client) => {
    return await client.query("SELECT * FROM blood_type WHERE id = $1", [id]);
}

module.exports.getBloodTypeFromName = async (type, rhesus, client) => {
    return await client.query("SELECT * FROM blood_type WHERE type = $1 AND rhesus = $2", [type.toUpperCase(), rhesus]);
}

module.exports.getBloodTypes = async (client) => {
    return await client.query("SELECT * FROM blood_type");
}

module.exports.createBloodType = async (type, rhesus, client) => {
    return await client.query("INSERT INTO blood_type (type, rhesus) VALUES ( $1, $2 )", [type.toUpperCase(), rhesus]);
}

module.exports.updateBloodType = async (id, type, rhesus, client) => {
    return await client.query("UPDATE blood_type SET type = $1, rhesus = $2 WHERE id = $3", [type.toUpperCase(), rhesus, id]);
}

module.exports.deleteBloodType = async (id, client) => {
    return await client.query("DELETE FROM blood_type WHERE id = $1", [id]);
}