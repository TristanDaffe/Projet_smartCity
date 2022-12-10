require('dotenv').config();
const process = require('process');
const jwt = require('jsonwebtoken');

const { validateString, validateEmail, validateDate } = require('../utils/utils');

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

            manageAuth(userType, value, res);
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
    
    let errors = [];
    errors[0] = validateString(lastName, "LastName");
    errors[1] = validateString(firstName, "Firstname"); 
    errors[2] = validateEmail(emailAddress);
    errors[3] = validateDate(birthdate);
    errors[4] = validateString(login, "Login"); 
    errors[5] = validateString(password, "Password");
    errors[6] = validateString(rhesus, "rhesus");
    errors[7] = validateString(bloodType, "rhesus");

    let i = 0;
    while(i < errors.length && errors[i].errorCode > 200 && errors[i].errorCode < 299) {
        i++;
    }
    if(i < errors.length) {
        res.status(errors[i].errorCode).send(errors[i].message);
    }
    else {
        try {
            const loginExist = await UserModele.loginExist(login, client);
            if(loginExist)
                res.status(409).send("Login already exist");
            else {
                const emailExist = await UserModele.emailExist(emailAddress, client);
                if(emailExist)
                    res.status(409).send("Email already exist");
                else {
                    const bloodTypesDB = await BloodTypeModel.getBloodTypeFromName(bloodType, rhesus, client);
                    const bloodTypeDB = bloodTypesDB.rows[0];
                    if(bloodTypeDB === undefined) {
                        res.status(404).send("Blood type not found");
                    }
                    else {
                        const result = await UserModele.registerUser(lastName, firstName, emailAddress, birthdate, bloodTypeDB.id, login, password, client);
                        const {userType, value} = result;

                        await manageAuth(userType, value, res);
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }
}

module.exports.patchUser = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { 
            id,
            lastName, 
            firstName, 
            emailAddress,
            birthdate,
            bloodTypeId,
            login, 
            password } = body;

        let errors = [];
        errors[0] = validateString(lastName, "LastName");
        errors[1] = validateString(firstName, "Firstname"); 
        errors[2] = validateEmail(emailAddress);
        errors[3] = validateDate(birthdate);
        errors[4] = validateString(login, "Login"); 
        errors[5] = validateString(password, "Password");dd
    
        let i = 0;
        while(i < errors.length && errors[i].errorCode > 200 && errors[i].errorCode < 299) {
            i++;
        }
        if(i < errors.length) {
            res.status(errors[i].errorCode).send(errors[i].message);
        }
        else {
            try {
            const result = await UserModele.updateUser(id, lastName, firstName, emailAddress, birthdate, bloodTypeId, login, password, client);
            const {userType, value} = result;
            
            await manageAuth(userType, value, res);
        }
        catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }
}

module.exports.deleteUser = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        }
        else {
            await UserModele.deleteUser(id, client);
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

const manageAuth = async (userType, value, res) => {

    if(userType === 'unknown') {
        res.status(404).send("User not found");
    }
    else if(userType === 'admin') {
        const {id, login} = value;
        const playload = {status: userType, value: {id, login}};
        const token = jwt.sign(
            playload, 
            process.env.SECRET_TOKEN, 
            {expiresIn: '24h'}
        );
        res.json({token});
    }
    else {
        const {id, first_name, last_name, email_address, login, birthday, blood_type} = value;
        const bloods = await BloodTypeModel.getBloodType(blood_type, client);
        const blood = bloods.rows[0];
        const user = {
            id, 
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
            {expiresIn: '24h'}
        );
        res.json({token, user});
    }
}