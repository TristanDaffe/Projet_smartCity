const pool = require('../model/database');
const DonationIntervalModel = require("../model/donationIntervalDB");
const BloodTypeModel = require("../model/bloodTypeDB");

module.exports.getDonationInterval = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        const {rows: donationIntervals} = await DonationIntervalModel.getDonationInterval(id, client);

        if(donationIntervals.length === 0) {
            res.status(404).send('Donation Interval not found');
        }
        else {
        res.json(donationIntervals);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getAllDonationIntervals = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: donationIntervals} = await DonationIntervalModel.getAllDonationIntervals(client);
        if(donationIntervals.length === 0) {
            res.status(404).send('Donation Interval not found');
        }
        else {
        res.json(donationIntervals);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.deleteDonationInterval = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        const {rows: donationIntervals} = await DonationIntervalModel.getDonationInterval(id, client);
        if(donationIntervals.length === 0) {
            res.status(404).send('Donation Interval not found');
        }
        else {
            await DonationIntervalModel.deleteDonationInterval(id, client);
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

module.exports.updateDonationInterval = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        firstDonationTypeId,
        nextDonationTypeId,
        timeBetween
    } = body;

    try {
        const {rows: firstDontation} = await BloodTypeModel.getBloodType(firstDonationTypeId, client);
        const {rows: nextDontation} = await BloodTypeModel.getBloodType(nextDonationTypeId, client);
        if(firstDontation.length === 0) {
            res.status(404).send('First donation type not found');
        }
        else if(nextDontation.length === 0) {
            res.status(404).send('Next donation type not found');
        }
        else {
            await DonationIntervalModel.updateDonationInterval(firstDonationTypeId, nextDonationTypeId, timeBetween, client);
            res.sendStatus(201);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createDonationIntervals = async (req, res) => {
    const client = await pool.connect();
    const intervals = req.body;

    try {
        await DonationIntervalModel.createDonationIntervals(intervals, client);
        res.sendStatus(201);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}
