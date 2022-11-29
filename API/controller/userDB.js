const pool = require('../model/database');
const UserModele = require("../model/userDB");
const BloodTypeModel = require("../model/bloodTypeDB");
const { validateString } = require('../utils/utils');

module.exports.postUser = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { login, password } = body;

    try {
        if(!validateString(login) || !validateString(password)) {
            res.sendStatus(400);
        }
        else {
            const {rows: users} = await UserModele.postUser(login, password, client);
            const user = users[0];

            if(user === undefined) {
                res.sendStatus(404);
            }
            else {
                const {rows: bloodTypes} = await BloodTypeModel.getBloodType(user.blood_type, client);
                user.blood_type = bloodTypes[0];
                res.json(user);
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

module.exports.getUser = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        }
        else {
            const {rows: users} = await UserModele.getUser(id, client);
            const user = users[0];
            if(user === undefined) {
                res.sendStatus(404);
            }
            else {
                const {rows: bloodTypes} = await BloodTypeModel.getBloodType(user.blood_type, client);
                user.blood_type = bloodTypes[0];
                res.json(user);
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

module.exports.registerUser = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { lastname, 
            firstname, 
            emailAddress,
            birthDay,
            bloodType,
            rhesus,
            login, 
            password } = body;
    
    try {
        if(!validateString(lastname) || 
            !validateString(firstname) || 
            !validateString(emailAddress) || 
            !validateString(birthDay) || 
            !validateString(bloodType) || 
            !validateString(rhesus) ||
            !validateString(login) || 
            !validateString(password)) {
            res.sendStatus(400);
        }
        else {
            const blood_type = await BloodTypeModel.getBloodTypeFromName(bloodType, rhesus, client);
            if(blood_type === undefined) {
                res.sendStatus(404);
            }
            else {
                const {rows: users} = await UserModele.registerUser(lastname, firstname, emailAddress, birthDay, blood_type.id, login, password, client);
                const user = users[0];
                res.json(user);
            }
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
}