const pool = require('../model/database');
const DonationTypeModel = require("../model/donationTypeDB");

const { validateString } = require('../validation/validator');

module.exports.getDonationType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.stauts(400).send('Id is not a number');
        }
        else {
            const {rows: donationTypes} = await DonationTypeModel.getDonationType(id, client);
            const donationType = donationTypes[0];
            
            if(donationType === undefined) {
                res.status(404).send('Donation type not found');
            }   
            else {
                res.json(donationType);
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

module.exports.getAllDonationType = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: donationTypes} = await DonationTypeModel.getAllDonationType(client);
        res.json(donationTypes);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createDonationType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        name,
        timeOfDonation,
    } = body;

    try {
        const {errorCode, message} = validateString(name);

        if(errorCode > 299 || errorCode < 200) {
            res.status(errorCode).send(message);
        }
        else if(timeOfDonation === undefined) {
            res.status(400).send('Time of donation is undefined');
        }
        else {
            const {rows: types} = await DonationTypeModel.getDonationTypeFromName(name, client);
            const type = types[0];
            if(type !== undefined) {
                res.status(409).send('Donation type already exists');
            }
            else {
                await DonationTypeModel.createDonationType(name, timeOfDonation, client);
                res.sendStatus(201);
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

module.exports.updateDonationType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        id,
        name,
        timeOfDonation,
    } = body;

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: types} = await DonationTypeModel.getDonationType(id, client);
            const type = types[0];
            const {rows: typesNames } = await DonationTypeModel.getDonationTypeFromName(name, client);
            const typeName = typesNames[0];

            if(type === undefined) {
                res.status(404).send('Donation type not found');
            }
            else if(typeName !== undefined && typeName.id !== id) {
                res.status(409).send('Donation type name already exists');
            }
            else if(timeOfDonation === undefined) {
                res.status(400).send('Time of donation is undefined');
            }
            else {
                const {errorCode, message} = validateString(name);

                if(errorCode > 299 || errorCode < 200) {
                    res.status(errorCode).send(message);
                }
                else {
                    await DonationTypeModel.updateDonationType(id, name, timeOfDonation, client);
                    res.sendStatus(200);
                }
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

module.exports.deleteDonationType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const type = await DonationTypeModel.getDonationType(id, client);
            if(type === undefined) {
                res.status(404).send('Donation type not found');
            }
            else {
                await DonationTypeModel.deleteDonationType(id, client);
                res.sendStatus(200);
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

