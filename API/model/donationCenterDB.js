module.exports.getDonationCenter = async( id, client) => {
    return await client.query(`SELECT donation_center.id, donation_center.name, donation_center.phone_number, donation_center.email_address, donation_center.fax, donation_center.street_name, donation_center.street_number, locality.name AS locality_name, locality.id AS locality_id
    FROM donation_center 
    INNER JOIN locality ON donation_center.locality = locality.id  
    WHERE donation_center.id = $1`, [id]);
}

module.exports.getDonationCenterDonations = async( id, client) => {
    return await client.query("SELECT donation_type.name FROM donation_center_donation_type INNER JOIN donation_type ON donation_center_donation_type.donation_type_id = donation_type.id WHERE donation_center_donation_type.donation_center_id = $1", [id]);
}

module.exports.getAllDonationCenters = async( client) => {
    return await client.query(`SELECT donation_center.id, donation_center.name, donation_center.phone_number, donation_center.email_address, donation_center.fax, donation_center.street_name, donation_center.street_number, 
    locality.name AS locality_name, locality.id AS locality_id
    FROM donation_center 
    INNER JOIN locality ON donation_center.locality = locality.id
    ORDER BY donation_center.id`);
}

module.exports.createDonationCenter = async( name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, availableDonation, client) => {
    await client.query('BEGIN TRANSACTION')
    try{
        const {rows: center} = await client.query("INSERT INTO donation_center (name, phone_number, email_address, fax, street_name, street_number, locality) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId]);
        for(const type of availableDonation){
            await client.query("INSERT INTO donation_available (center_id, donation_type_id) VALUES ($1, $2)", [center[0].id, type]);
        }
        await client.query("COMMIT");
    }
    catch(e){
        await client.query('ROLLBACK');
        throw e
    }
}

module.exports.updateDonationCenter = async( id, name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, client) => {
    return await client.query("UPDATE donation_center SET name = $1, phone_number = $2, email_address = $3, fax = $4, street_name = $5, street_number = $6, locality = $7 WHERE id = $8 RETURNING *", [name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, id]);
}

module.exports.deleteDonationCenter = async( id, client) => {
    await client.query('BEGIN TRANSACTION')
    try{
        await client.query("DELETE FROM open_day WHERE center_id = $1", [id]);
        await client.query("DELETE FROM donation_available WHERE center_id = $1", [id]);
        await client.query("DELETE FROM donation_center WHERE id = $1", [id]);
        await client.query('COMMIT')
    }
    catch(e){
        await client.query('ROLLBACK')
        throw e
    }
}

module.exports.getDonationForCenter = async( id, client) => {
    return await client.query("SELECT * FROM donation WHERE donation_center_id = $1", [id]);
}

module.exports.getDonationTypeAvailableForCenter = async( id, client) => {
    return await client.query(`SELECT donation_type.id, donation_type.name 
        FROM donation_available 
        INNER JOIN donation_type ON donation_available.donation_type_id = donation_type.id
        WHERE donation_available.center_id = $1`, [id]);
}