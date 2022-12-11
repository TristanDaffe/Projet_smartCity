
module.exports.getDonation = async (id, client) => {
    return await client.query("SELECT * FROM donation WHERE id = $1", [id]);
}

module.exports.getLongestInterval = async (client) => {
    return await client.query("SELECT * FROM time_between_donation order by time_between DESC");
}

module.exports.getDonationOfUserFromDate = async (userId, date, client) => {
    return await client.query("SELECT * FROM donation WHERE user_id = $1 and date >= $2 order by date desc", [userId, date]);
}

module.exports.getInterval = async (idFirstDonation, idSecondDonation, client) => {
    return await client.query("SELECT time_between FROM time_between_donation WHERE first_donation_type_id = $1 and next_donation_type_id = $2", 
        [idFirstDonation, idSecondDonation]);
}

module.exports.getDonationsOfUser = async (id, client) => {
    return await client.query("SELECT * FROM donation WHERE user_id = $1 order by date desc", [id]);
}

module.exports.getAllDonation = async (client) => {
    return await client.query("SELECT * FROM donation");
}

module.exports.createDonation = async (date, hour, donationTypeId, userId, donationCenterId, client ) => {
    return await client.query("INSERT INTO donation (date, hour, donation_type_id, user_id, donation_center_id) VALUES ( $1, $2, $3, $4, $5)", 
    [date, hour, donationTypeId, userId, donationCenterId]);
}

module.exports.updateDonation = async (date, donationTypeId, userId, donationCenterId, client) => {
    return await client.query("UPDATE donation SET date = $1, donation_type_id = $2, user_id = $3, donation_center_id = $4 WHERE id = $5",
        [date, donationTypeId, userId, donationCenterId, id]);
}

module.exports.deleteDonation = async (id, client) => {
    return await client.query("DELETE FROM donation WHERE id = $1", [id]);
}