module.exports.getDonationIntervalle = async (id, client) => {
    return await client.query('SELECT * FROM time_between_donation WHERE first_donation_type_id = $1 OR next_donation_type_id = $1', 
    [id]);
}

module.exports.getAllDonationIntervalles = async (client) => {
    return await client.query('SELECT * FROM time_between_donation');
}

module.exports.deleteDonationIntervalle = async (id, client) => {
    return await client.query('DELETE FROM time_between_donation WHERE first_donation_type_id = $1 OR next_donation_type_id = $1', 
    [id]);
}

module.exports.updateDonationIntervalle = async (donationIntervalle, client) => {
}