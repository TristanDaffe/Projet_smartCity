const pool = require('../model/database');
const bloodTypeModel = require("../model/bloodTypeDB");

module.exports.getBloodType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        }
        else {
            const {rows: bloodTypes} = await bloodTypeModel.getBloodType(id, client);
            const bloodType = bloodTypes[0];
            
            if(bloodType === undefined) {
                res.sendStatus(404);
            }   
            else {
                res.json(bloodType);
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

module.exports.getBloodTypeFromName = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { type, rhesus } = body;
    try {
        if(type === undefined || rhesus === undefined) {
            res.sendStatus(400);
        }
        else {
            const {rows: bloodTypes} = await bloodTypeModel.getBloodTypeFromName(type, rhesus, client);
            const bloodType = bloodTypes[0];
            
            if(bloodType === undefined) {
                res.sendStatus(404);
            }   
            else {
                res.json(bloodType);
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

module.exports.getBloodTypes = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: bloodTypes} = await bloodTypeModel.getBloodTypes(client);
        res.json(bloodTypes);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

module.exports.createBloodType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { type, rhesus } = body;

    try {
        if(type === undefined || rhesus === undefined) {
            res.sendStatus(400);
        }
        else {
            // vérifier si le type de sang existe déjà
            // déjà en contrainte de base de données ( à voir si utiles pour le code erreur )

            const {rows: bloodTypes} = await bloodTypeModel.getBloodTypeFromName(type, rhesus, client);
            const bloodType = bloodTypes[0];
            if(bloodType !== undefined) {
                res.sendStatus(409);
            }
            else {
                const bloodType = await bloodTypeModel.createBloodType(type, rhesus, client);
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

module.exports.updateBloodType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { id, type, rhesus } = body;
    
    try {
        if(isNaN(id) || type === undefined || rhesus === undefined) {
            res.sendStatus(400);
        }
        else {
            await bloodTypeModel.updateBloodType(id, type, rhesus, client);
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