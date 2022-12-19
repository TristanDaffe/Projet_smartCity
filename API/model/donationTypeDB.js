module.exports.getDonationType = async (id, client) => {
    return await client.query('SELECT * FROM donation_type WHERE id = $1', [id]);
}

module.exports.getDonationTypeFromName = async (name, client) => {
    return await client.query('SELECT * FROM donation_type WHERE name = $1', [name]);
}

module.exports.getAllDonationType = async (client) => {
    return await client.query('SELECT * FROM donation_type');
}

module.exports.createDonationType = async (name, timeOfDonation, client) => {
    return await client.query('INSERT INTO donation_type (name, time_of_donation) VALUES ($1, $2)', 
    [name, timeOfDonation]);
}

module.exports.updateDonationType = async (id, name, timeOfDonation, client) => {
    return await client.query('UPDATE donation_type SET name = $1, time_of_donation = $2 WHERE id = $3', 
    [name, timeOfDonation, id]);
}

module.exports.deleteDonationType = async (id, client) => {
    return await client.query('DELETE FROM donation_type WHERE id = $1', [id]);
}

module.exports.getDonationFromDonationType = async (id, client) => {
    return await client.query('SELECT * FROM donation WHERE donation_type_id = $1', [id]);
}