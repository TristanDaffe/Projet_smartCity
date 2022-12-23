
module.exports.getDonation = async (id, client) => {
    return await client.query(`SELECT donation.id, donation.date, donation.hour, donation.user_id, donation.donation_center_id, donation.donation_type_id, 
        ua.last_name, ua.first_name, type.name, dc.name as donation_center_name, bt.type as blood_type_name, bt.rhesus as blood_type_rhesus
        FROM donation 
        INNER JOIN user_account ua on ua.id = donation.user_id
        INNER JOIN donation_type type on type.id = donation.donation_type_id
        INNER JOIN donation_center dc on dc.id = donation.donation_center_id
        INNER JOIN blood_type bt on bt.id = ua.blood_type
        WHERE donation.id = $1`, [id]);
}

module.exports.getLongestInterval = async (client) => {
    return await client.query("SELECT * FROM time_between_donation order by time_between DESC");
}

module.exports.getDonationOfUserFromDate = async (userId, date, client) => {
    return await client.query(`SELECT donation.id, donation.date, donation.hour, donation.user_id, donation.donation_center_id, donation.donation_type_id, ua.last_name, ua.first_name, 
        type.name, dc.name as donation_center_name, bt.type as blood_type_name, bt.rhesus as blood_type_rhesus 
        FROM donation 
        INNER JOIN user_account ua on ua.id = donation.user_id
        INNER JOIN donation_type type on type.id = donation.donation_type_id
        INNER JOIN donation_center dc on dc.id = donation.donation_center_id
        INNER JOIN blood_type bt on bt.id = ua.blood_type
        WHERE user_id = $1 and date >= $2 
        order by date desc`,
        [userId, date]);
}

module.exports.getInterval = async (idFirstDonation, idSecondDonation, client) => {
    return await client.query("SELECT time_between FROM time_between_donation WHERE first_donation_type_id = $1 and next_donation_type_id = $2", 
        [idFirstDonation, idSecondDonation]);
}

module.exports.getDonationsOfUser = async (id, client) => {
    return await client.query(`SELECT donation.id, donation.date, donation.hour, donation.user_id, donation.donation_center_id, donation.donation_type_id,  ua.last_name, ua.first_name, 
        type.name, dc.name as donation_center_name, bt.type as blood_type_name, bt.rhesus as blood_type_rhesus FROM donation 
        INNER JOIN user_account ua on ua.id = donation.user_id 
        INNER JOIN donation_type type on type.id = donation.donation_type_id 
        INNER JOIN donation_center dc on dc.id = donation.donation_center_id
        INNER JOIN blood_type bt on bt.id = ua.blood_type
        WHERE donation.user_id = $1 
        order by date desc`,
        [id]);
}

module.exports.getAllDonation = async (client) => {
    return await client.query(`SELECT donation.id, donation.date, donation.hour, donation.user_id, donation.donation_center_id, 
    donation.donation_type_id,  ua.last_name, ua.first_name, type.name, dc.name as donation_center_name, bt.type as blood_type_name, bt.rhesus as blood_type_rhesus
    FROM donation 
    INNER JOIN user_account ua on ua.id = donation.user_id 
    INNER JOIN donation_type type on type.id = donation.donation_type_id 
    INNER JOIN donation_center dc on dc.id = donation.donation_center_id 
    INNER JOIN blood_type bt on bt.id = ua.blood_type
    order by donation.id asc`);
}

module.exports.createDonation = async (date, hour, donationTypeId, userId, donationCenterId, client ) => {
    return await client.query("INSERT INTO donation (date, hour, donation_type_id, user_id, donation_center_id) VALUES ( $1, $2, $3, $4, $5)", 
    [date, hour, donationTypeId, userId, donationCenterId]);
}

module.exports.updateDonation = async (id, hour, date, donationTypeId, userId, donationCenterId, client) => {
    return await client.query("UPDATE donation SET date = $1, hour= $2, donation_type_id = $3, user_id = $4, donation_center_id = $5 WHERE id = $6",
        [date, hour, donationTypeId, userId, donationCenterId, id]);
}

module.exports.deleteDonation = async (id, client) => {
    return await client.query("DELETE FROM donation WHERE id = $1", [id]);
}