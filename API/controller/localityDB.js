const pool = require('../model/database');
const LocalityModel = require("../model/localityDB");

module.exports.getLocality = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: localities} = await LocalityModel.getLocality(id, client);
            const locality = localities[0];
            
            if(locality === undefined) {
                res.status(404).send('Locality not found');
            }   
            else {
                res.json(locality);
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

module.exports.createLocality = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { name, postalCode } = body;
    try {
        if(name === undefined) {
            res.status(400).send("Name is undefined");
        }
        else if(postalCode === undefined) {
            res.status(400).send("Postal code is undefined");
        }
        else {
            await LocalityModel.createLocality(name, postalCode, client);
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

module.exports.updateLocality = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { id, name, postalCode } = body;

    try {
        if(id === undefined) {
            res.status(400).send("Id is undefined");
        }
        else if(name === undefined) {
            res.status(400).send("Name is undefined");
        }
        else if(postalCode === undefined) {
            res.status(400).send("Postal code is undefined");
        }
        else {
            await LocalityModel.updateLocality(id, name, postalCode, client);
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

module.exports.deleteLocality = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            await LocalityModel.deleteLocality(id, client);
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

module.exports.getAllLocalities = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: localities} = await LocalityModel.getAllLocalities(client);
        res.json(localities);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}