const pool = require('../model/database');
const BloodTypeModel = require("../model/bloodTypeDB");

module.exports.getBloodType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.stauts(400).send('Id is not a number');
        }
        else {
            const {rows: bloodTypes} = await BloodTypeModel.getBloodType(id, client);
            const bloodType = bloodTypes[0];
            
            if(bloodType === undefined) {
                res.status(404).send('Blood type not found');
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
            const {rows: bloodTypes} = await BloodTypeModel.getBloodTypeFromName(type, rhesus, client);
            const bloodType = bloodTypes[0];
            
            if(bloodType === undefined) {
                res.status(404).send('Blood type not found');
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

module.exports.getAllBloodType = async (req, res) => {
    const client = await pool.connect();
    try {
        const {rows: bloodTypes} = await BloodTypeModel.getBloodTypes(client);
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

            const {rows: bloodTypes} = await BloodTypeModel.getBloodTypeFromName(type, rhesus, client);
            const bloodType = bloodTypes[0];
            if(bloodType !== undefined) {
                res.status(409).send("Blood type already exists");
            }
            else {
                const bloodType = await BloodTypeModel.createBloodType(type, rhesus, client);
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
            await BloodTypeModel.updateBloodType(id, type, rhesus, client);
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

module.exports.deleteBloodType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            await BloodTypeModel.deleteBloodType(id, client);
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