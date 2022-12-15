const pool = require('../model/database');
const DonationIntervalModel = require("../model/donationIntervalDB");

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
        await DonationIntervalModel.deleteDonationInterval(id, client);
        res.sendStatus(201);
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
        id,
        firstDonationTypeId,
        nextDonationTypeId,
        Interval
    } = body;

    try {
        await DonationIntervalModel.updateDonationInterval(id, firstDonationTypeId,nextDonationTypeId, Interval, client);
        res.sendStatus(201);
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
    const body = req.body;
    const Intervals = body.Intervals;

    try {
        await DonationIntervalModel.createDonationIntervals(Intervals, client);
        res.sendStatus(201);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}
