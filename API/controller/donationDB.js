const pool = require('../model/database');
const DonationModel = require("../model/donationDB");

module.exports.getDonation = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: donations} = await DonationModel.getDonation(id, client);
            const donation = donations[0];
            
            if(donation === undefined) {
                res.status(404).send('Donation not found');
            }   
            else {
                res.json(donation);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getDonationsOfUser = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.stauts(400).send('Id is not a number');
        }
        else {
            const {rows: donations} = await DonationModel.getDonationsOfUser(id, client);
            res.json(donations);
            
            if(donation === undefined) {
                res.status(404).send('Donation not found');
            }   
            else {
                res.json(donation);
            }
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }

}

module.exports.getAllDonation = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: donations} = await DonationModel.getAllDonation(client);
        res.json(donations);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createDonation = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        date,
        hour,
        donationTypeId,
        userId,
        donationCenterId,
    } = body;
    const dateFormatDB = new Date(date);
    
    try {
        // récupérer les dons de l'utilisateur
        const maxIntervals = await DonationModel.getLongestInterval(client);
        let maxInterval = maxIntervals.rows[0].time_between.months;
        let minDate = new Date();
        if(maxInterval.months)
            maxInterval += 4 * maxInterval.months;

        minDate.setDate(minDate.getDay() - (maxInterval * 7));

        const {rows: donations} = await DonationModel.getDonationOfUserFromDate(userId, minDate, client);
        // filtre pour avoir le dernier don de chaque type de don fais
        let lastDonationOfEveryType = [];
        donations.map(donation => {
            if(!lastDonationOfEveryType.some(d => d.donation_type_id === donation.donation_type_id))
            lastDonationOfEveryType.push(donation);
        });
        let canAdd = true;
        let i = 0;
        while(canAdd && i < lastDonationOfEveryType.length) {
            const intervals = await DonationModel.getInterval(lastDonationOfEveryType[i].donation_type_id, donationTypeId, client);
            const interval = intervals.rows[0].time_between.days;
            const timeMiliSec = Math.abs(dateFormatDB - (lastDonationOfEveryType[i].date));
            const timeDays = Math.ceil(timeMiliSec / (1000 * 3600 * 24));
            canAdd =  timeDays >= interval;
            i++;
        }

        if(canAdd){
            await DonationModel.createDonation(date, hour, donationTypeId, userId, donationCenterId, client);
            res.sendStatus(201);
        }
        else {
            res.status(400).send("You can't add a donation of this type at this date");
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getLastDonationOfEveryTypeOfUser = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        // récupérer les dons de l'utilisateur
        const maxIntervals = await DonationModel.getLongestInterval(client);
        let maxInterval = maxIntervals.rows[0].time_between.months;
        let minDate = new Date();
        if(maxInterval.months)
            maxInterval += 4 * maxInterval.months;

        minDate.setDate(minDate.getDay() - (maxInterval * 7));

        const {rows: donations} = await DonationModel.getDonationOfUserFromDate(id, minDate, client);
        if( donations.length === 0) {
            res.status(404).send('No donation found');
        }
        else{
            // filtre pour avoir le dernier don de chaque type de don fais
            let lastDonationOfEveryType = [];
            donations.map(donation => {
                if(!lastDonationOfEveryType.some(d => d.donation_type_id === donation.donation_type_id))
                lastDonationOfEveryType.push(donation);
            });
            res.json(lastDonationOfEveryType);
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.updateDonation = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        id,
        hour,
        date,
        donationTypeId,
        userId,
        donationCenterId,
    } = body;

    try {
        await DonationModel.updateDonation(id, hour, date, donationTypeId, userId, donationCenterId, client);
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.deleteDonation = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            await DonationModel.deleteDonation(id, client);
            res.sendStatus(200);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}