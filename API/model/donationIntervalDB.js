module.exports.getDonationInterval = async (id, client) => {
    return await client.query(`SELECT d1.name as firtsDonation, d1.id as firstDonationId, d2.name as secondDonation, d2.id as secondDonationId, time_between 
        FROM time_between_donation
        INNER JOIN donation_type d1 ON d1.id = time_between_donation.first_donation_type_id
        INNER JOIN donation_type d2 ON d2.id = time_between_donation.next_donation_type_id
        WHERE time_between_donation.first_donation_type_id = $1 OR time_between_donation.next_donation_type_id = $1
        ORDER BY firtsDonation, secondDonation`, 
    [id]);
}

module.exports.getAllDonationIntervals = async (client) => {
    return await client.query(`SELECT d1.name as firtsDonation, d1.id as firstDonationId, d2.name as secondDonation, d2.id as secondDonationId, time_between 
        FROM time_between_donation
        INNER JOIN donation_type d1 ON d1.id = time_between_donation.first_donation_type_id
        INNER JOIN donation_type d2 ON d2.id = time_between_donation.next_donation_type_id
        ORDER BY firtsDonation, secondDonation`);
}

module.exports.deleteDonationInterval = async (id, client) => {
    return await client.query('DELETE FROM time_between_donation WHERE first_donation_type_id = $1 OR next_donation_type_id = $1', 
    [id]);
}

module.exports.updateDonationInterval = async (id, firstDonation, nextDonation, DonationIntervalRouter, client) => {
    return await client.query('UPDATE time_between_donation SET first_donation_type_id = $1, next_donation_type_id = $2 first_donation_type = $3 WHERE id = $4', 
    [Interval, firstDonation, nextDonation, id]);
}

module.exports.createDonationIntervals = async (Intervals, client) => {
    await client.query('BEGIN');
    try{
        for(const Interval of Intervals){
            await client.query('INSERT INTO time_between_donation (first_donation_type_id, next_donation_type_id, Interval) VALUES ($1, $2, $3)',
            [Interval.firstDonationTypeId, Interval.nextDonationTypeId, Interval.Interval]); 
        }
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
}