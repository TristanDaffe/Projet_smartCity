const pool = require('../model/database');
const OpeningDayModel = require("../model/openingDayDB");

const { validateDay } = require('../validation/validator');

module.exports.getOpeningDay = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: openingDays} = await OpeningDayModel.getOpeningDay(id, client);
            const openingDay = openingDays[0];
            
            if(openingDay === undefined) {
                res.status(404).send('Opening day not found');
            }   
            else {
                res.json(openingDay);
            }
        }
    }
    catch(error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getOpeningForDay = async (req, res) => {
    const client = await pool.connect();
    const day = req.params.day;

    try {
        if(day === undefined) {
            res.status(400).send('Day is not defined');
        }
        else {
            const {rows : openings} = await OpeningDayModel.getOpeningForDay(day, client);
            res.json(openings);
        }
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createOpeningDay = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const {
        dayLabel,
        openingTime,
        closingTime        
    } = body;

    try {
        const { errorCode, message } = validateDay(dayLabel);
        if(errorCode > 299 || errorCode < 200) {
            res.status(errorCode).send(message);
        }
        else {
            await OpeningDayModel.createOpeningDay(dayLabel, openingTime, closingTime, client);
            res.sendStatus(201);
        }
    }
    catch(error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.updateOpeningDay = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const {
        id,
        dayLabel,
        openingTime,
        closingTime
    } = body;

    try {
        const { errorCode, message } = validateDay(dayLabel);
        if(errorCode > 299 || errorCode < 200) {
            res.status(errorCode).send(message);
        }
        else {
            await OpeningDayModel.updateOpeningDay(id, dayLabel, openingTime, closingTime, client);
            res.sendStatus(200);
        }
    }
    catch(error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.deleteOpeningDay = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: openingDays} = await OpeningDayModel.getOpeningDay(id, client);
            const openingDay = openingDays[0];
            if(openingDay === undefined)
                res.status(404).send('Opening day not found');
            else {
                await OpeningDayModel.deleteOpeningDay(id, client);
                res.sendStatus(200);
            }
        }
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.getAllOpeningDays = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: openingDays} = await OpeningDayModel.getAllOpeningDays(client);
        res.json(openingDays);
    }
    catch(error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}