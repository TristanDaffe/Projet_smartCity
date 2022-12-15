module.exports.getDonationCenter = async( id, client) => {
    return await client.query("SELECT donation_center.id, donation_center.name, donation_center.phone_number, donation_center.email_address, donation_center.fax, donation_center.street_name, donation_center.number_in_street, locality.name AS locality_name FROM donation_center INNER JOIN locality ON donation_center.locality_id = locality.id  WHERE id = $1", [id]);
}
// faire une autre fonction pour récupérer les types de dons d'un centre de don
module.exports.getDonationCenterDonations = async( id, client) => {
    return await client.query("SELECT donation_type.name FROM donation_center_donation_type INNER JOIN donation_type ON donation_center_donation_type.donation_type_id = donation_type.id WHERE donation_center_donation_type.donation_center_id = $1", [id]);
}

module.exports.getAllDonationCenters = async( client) => {
    return await client.query(`SELECT donation_center.id, donation_center.name, donation_center.phone_number, donation_center.email_address, donation_center.fax, donation_center.street_name, donation_center.street_number, 
    locality.name AS locality_name
    FROM donation_center 
    INNER JOIN locality ON donation_center.locality = locality.id`);
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