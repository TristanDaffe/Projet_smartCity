const pool = require('../model/database');
const DonationIntervalleModel = require("../model/donationIntervalleDB");

module.exports.getDonationIntervalle = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        const {rows: donationIntervalles} = await DonationIntervalleModel.getDonationIntervalle(id, client);

        if(donationIntervalles.length === 0) {
            res.status(404).send('Donation intervalle not found');
        }
        else {
        res.json(donationIntervalles);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getAllDonationIntervalles = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: donationIntervalles} = await DonationIntervalleModel.getAllDonationIntervalles(client);
        if(donationIntervalles.length === 0) {
            res.status(404).send('Donation intervalle not found');
        }
        else {
        res.json(donationIntervalles);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.deleteDonationIntervalle = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        await DonationIntervalleModel.deleteDonationIntervalle(id, client);
        res.sendStatus(201);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.updateDonationIntervalle = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const intervalles = body;

    try {
        await DonationIntervalleModel.updateDonationIntervalle(intervalles, client);
        res.sendStatus(201);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}