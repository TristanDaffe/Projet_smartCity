module.exports.getDonationCenter = async( id, client) => {
    return await client.query("SELECT * FROM donation_center WHERE id = $1", [id]);
}

module.exports.getAllDonationCenters = async( client) => {
    return await client.query("SELECT * FROM donation_center");
}

module.exports.createDonationCenter = async( name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, client) => {
    return await client.query("INSERT INTO donation_center (name, phone_number, email_address, fax, street_name, street_number, locality) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId]);
}

module.exports.updateDonationCenter = async( id, name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, client) => {
    return await client.query("UPDATE donation_center SET name = $1, phone_number = $2, email_address = $3, fax = $4, street_name = $5, number_in_street = $6, locality_id = $7 WHERE id = $8 RETURNING *", [name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, id]);
}

module.exports.deleteDonationCenter = async( id, client) => {
    return await client.query("DELETE FROM donation_center WHERE id = $1", [id]);
}