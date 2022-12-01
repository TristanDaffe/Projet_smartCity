require('dotenv').config();
const process = require('process');
const jwt = require('jsonwebtoken');

const { validateString } = require('../utils/utils');

const pool = require('../model/database');
const UserModele = require("../model/userDB");
const BloodTypeModel = require("../model/bloodTypeDB");

module.exports.loginUser = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { login, password } = body;

    try {
        if(!validateString(login) || !validateString(password)) {
            res.sendStatus(400);
        }
        else {
            const result = await UserModele.postUser(login, password, client);
            const {userType, value} = result;

            if(userType === 'unknown') {
                res.sendStatus(404);
            }
            else if(userType === 'admin') {
                const {id, login} = value;
                const playload = {status: userType, value: {id, login}};
                const token = jwt.sign(
                    playload, 
                    process.env.SECRET_TOKEN, 
                    {expiresIn: '1h'}
                );
                res.json({token});
            }
            else {
                const {id, first_name, last_name, email_address, login, birthday, blood_type} = value;
                const bloods = await BloodTypeModel.getBloodType(blood_type, client);
                const blood = bloods.rows[0];
                const user = {id, 
                    firstName: first_name, 
                    lastName: last_name,
                    emailAddress: email_address, 
                    login, 
                    birthDay: birthday, 
                    blood_type: blood
                };

                const playload = {status: userType, value: {id, login}};
                const token = jwt.sign(
                    playload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1h'}
                );
                res.json({token, user});
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

    const { lastName, 
            firstName, 
            emailAddress,
            birthdate,
            bloodType,
            rhesus,
            login, 
            password } = body;
    try {
        if(!validateString(lastName) || 
                !validateString(firstName) || 
                !validateString(emailAddress) || 
                !validateString(birthdate) || 
                !validateString(bloodType) || 
                !validateString(rhesus) ||
                !validateString(login) || 
                !validateString(password)) {
            res.sendStatus(400);
        }
        else {
            const bloodTypesDB = await BloodTypeModel.getBloodTypeFromName(bloodType, rhesus, client);
            const bloodTypeDB = bloodTypesDB.rows[0];
            if(bloodTypeDB === undefined) {
                res.sendStatus(404);
            }
            else {
                const result = await UserModele.registerUser(lastName, firstName, emailAddress, birthdate, bloodTypeDB.id, login, password, client);
                const {userType, value} = result;
                if(userType === 'unknown') {
                    res.sendStatus(404);
                }
                else if(userType === 'admin') {
                    const {id, login} = value;
                    const playload = {status: userType, value: {id, login}};
                    const token = jwt.sign(
                        playload, 
                        process.env.SECRET_TOKEN, 
                        {expiresIn: '1h'}
                    );
                    res.json({token});
                }
                else {
                    const {id, first_name, last_name, email_address, login, birthday, blood_type} = value;
                    const bloods = await BloodTypeModel.getBloodType(blood_type, client);
                    const blood = bloods.rows[0];
                    const user = {id, 
                        firstName: first_name, 
                        lastName: last_name,
                        emailAddress: email_address, 
                        login, 
                        birthDay: birthday, 
                        blood_type: blood
                    };
    
                    const playload = {status: userType, value: {id, login}};
                    const token = jwt.sign(
                        playload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1h'}
                    );
                    res.json({token, user});
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}