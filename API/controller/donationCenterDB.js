const pool = require('../model/database');
const DonationCenterModel = require("../model/donationCenterDB");
const OpeningDayModel = require("../model/openingDayDB");

module.exports.getDonationCenter = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: donationCenters} = await DonationCenterModel.getDonationCenter(id, client);
            const donationCenter = donationCenters[0];
            
            if(donationCenter === undefined) {
                res.status(404).send('Donation center not found');
            }   
            else {           
                const {rows: donationTypeAvailables} = await DonationCenterModel.getDonationTypeAvailableForCenter(donationCenter.id, client);
                donationCenter.donationTypeAvailable = donationTypeAvailables;
                res.json(donationCenter);
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

module.exports.getAllDonationCenters = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: donationCenters} = await DonationCenterModel.getAllDonationCenters(client);
        for(let center of donationCenters) {
            const {rows: donationTypeAvailables} = await DonationCenterModel.getDonationTypeAvailableForCenter(center.id, client);
            center.donationTypeAvailable = donationTypeAvailables;
        }   
        res.json(donationCenters);
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createDonationCenter = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { 
        name, 
        phoneNumber, 
        emailAddress, 
        fax, 
        streetName, 
        numberInStreet, 
        localityId,
        availableDonation } = body;

    try {

        if(name === undefined){
            res.status(400).send('Name is undefined');
        }
        else if(localityId === undefined){
            res.status(400).send('Locality id is undefined');
        }
        else if(phoneNumber === undefined){
            res.status(400).send('Phone number is undefined');
        }
        else if(streetName === undefined){
            res.status(400).send('Street name is undefined');
        }
        else if(numberInStreet === undefined){
            res.status(400).send('Number in street is undefined');
        }
        else {
            await DonationCenterModel.createDonationCenter(name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, availableDonation, client);
            res.sendStatus(201);
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

module.exports.updateDonationCenter = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {
        id,
        name, 
        phoneNumber, 
        emailAddress, 
        fax, 
        streetName, 
        numberInStreet, 
        localityId } = body;

    try {
        if(id === undefined){
            res.status(400).send('Id is undefined');
        }
        else if(name === undefined){
            res.status(400).send('Name is undefined');
        }
        else if(localityId === undefined){
            res.status(400).send('Locality id is undefined');
        }
        else if(phoneNumber === undefined){
            res.status(400).send('Phone number is undefined');
        }
        else if(streetName === undefined){
            res.status(400).send('Street name is undefined');
        }
        else if(numberInStreet === undefined){
            res.status(400).send('Number in street is undefined');
        }
        else {
            const {rows: donationCenters} = await DonationCenterModel.getDonationCenter(id, client);
            const donationCenter = donationCenters[0];
            
            if(donationCenter === undefined) {
                res.status(404).send('Donation center not found');
            }   
            else {
                const {rows: center} = await DonationCenterModel.getDonationCenter(id, client);
                if(center[0] === undefined) {
                    res.status(404).send('Donation center not found');
                }
                else {
                    await DonationCenterModel.updateDonationCenter(id, name, phoneNumber, emailAddress, fax, streetName, numberInStreet, localityId, client);
                    res.sendStatus(200);
                }
            }
        }
    }
    catch (error) {
        console.log()
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.deleteDonationCenter = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: donationCenters} = await DonationCenterModel.getDonationCenter(id, client);
            const donationCenter = donationCenters[0];
            
            if(donationCenter === undefined) {
                res.status(404).send('Donation center not found');
            }   
            else {
                const {rows: donation} = await DonationCenterModel.getDonationForCenter(id, client);

                if(donation.length > 0){
                    res.status(400).send('Donation center has donations');
                }
                else {
                    try {
                        await DonationCenterModel.deleteDonationCenter(id, client);
                        res.sendStatus(200);
                    }
                    catch (error) {
                        console.log(error);
                        res.status(500).send('Error deleting donation center');
                    }
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

module.exports.getOpeningDaysForCenter = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);
    
    try{
        const {rows: openingDays} = await OpeningDayModel.getOpeningDaysForCenter(id, client);
        res.json(openingDays);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}
