require('dotenv').config();
const process = require('process');
const jwt = require('jsonwebtoken');

const { validateString, validateEmail, validateDate } = require('../utils/validator');
const { getHash } = require('../utils/hash');

const pool = require('../model/database');
const UserModele = require("../model/userDB");
const BloodTypeModel = require("../model/bloodTypeDB");

const manageAuth = async (userType, value, res, client) => {

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
        const isAdmin = true;
        res.json({token, isAdmin});
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
        const isAdmin = false;
        res.json({token, isAdmin, user});
    }
}


module.exports.loginUser = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { login, password } = body;


    let errors = [];
    errors[0] = validateString(login, "Login");
    errors[1] = validateString(password, "Password"); 

    try {
        let i = 0;
        while(i < errors.length && errors[i].errorCode > 200 && errors[i].errorCode < 299) {
            i++;
        }
        if(i < errors.length) {
            res.status(errors[i].errorCode).json(errors[i].message);
        }
        else {
            const result = await UserModele.loginUser(login, password, client);
            const {userType, value} = result;

            manageAuth(userType, value, res, client);
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
            res.status(400).send("Id is not a number");
        }
        else {
            const {rows: users} = await UserModele.getUser(id, client);
            const user = users[0];
            if(user === undefined) {
                res.status(404).send("User not found");
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
            password: passwordClear } = body;
    
    let errors = [];
    errors[0] = validateString(lastName, "LastName");
    errors[1] = validateString(firstName, "Firstname"); 
    errors[2] = validateEmail(emailAddress);
    errors[3] = validateDate(birthdate);
    errors[4] = validateString(login, "Login"); 
    errors[5] = validateString(passwordClear, "Password");
    errors[6] = validateString(rhesus, "rhesus");
    errors[7] = validateString(bloodType, "rhesus");


    try {
        let i = 0;
        while(i < errors.length && errors[i].errorCode > 200 && errors[i].errorCode < 299) {
            i++;
        }
        if(i < errors.length) {
            res.status(errors[i].errorCode).send(errors[i].message);
        }
        else {
            const password = await getHash(passwordClear);
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

                        await manageAuth(userType, value, res, client);
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
            password: passwordClear } = body;

    let errors = [];
    errors[0] = validateString(lastName, "LastName");
    errors[1] = validateString(firstName, "Firstname"); 
    errors[2] = validateEmail(emailAddress);
    errors[3] = validateDate(birthdate);
    errors[4] = validateString(login, "Login"); 

    try {
        let i = 0;
        while(i < errors.length && errors[i].errorCode >= 200 && errors[i].errorCode <= 299) {
            i++;
        }
        if(i < errors.length) {
            res.status(errors[i].errorCode).send(errors[i].message);
        }
        else {
            const {rows: users} = await UserModele.getUser(id, client);
            const user = users[0];
            if(user === undefined) {
                res.status(404).send("User not found");
            }
            else {
            const {rows: usersLog} = await UserModele.getUserByLogin(login, client);
            const userLog = usersLog[0];
                if(userLog !== undefined && userLog.id !== id) { 
                    res.status(409).send("Login already exist");
                }
                else {
                    const {rows: usersEmail} = await UserModele.getUserByMail(emailAddress, client);
                    const userMail = usersEmail[0];
                    if(userMail !== undefined && userMail.id !== id)
                        res.status(409).send("Email already exist");
                    else {
                        let result;
                        if(passwordClear === undefined)
                            result = await UserModele.updateUserWithoutPassword(id, lastName, firstName, emailAddress, birthdate, bloodTypeId, login, client);
                        else{
                            const password = await getHash(passwordClear);
                            result = await UserModele.updateUser(id, lastName, firstName, emailAddress, birthdate, bloodTypeId, login, password, client);
                        }
                        const {userType, value} = result;
                        await manageAuth(userType, value, res, client);
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

module.exports.deleteUser = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: users} = await UserModele.getUser(id, client);
            const user = users[0];
            if(user === undefined) {
                res.status(404).send("User not found");
            }
            else { 
                await UserModele.deleteUser(id, client);
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


module.exports.getAllUsers = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: users} = await UserModele.getAllUsers(client);
        res.json(users);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}

