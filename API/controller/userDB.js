const pool = require('../model/database');
const UserModele = require("../model/userDB");
const bloodTypeModel = require("../model/bloodTypeDB");

module.exports.getUserFromLogin = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { login, password } = body;
    try {
        if(login === null || password === null) {
            res.sendStatus(400);
        }
        else {
            const {rows: users} = await UserModele.getUserFromLogin(login, password, client);
            const user = users[0];

            if(user === undefined) {
                res.sendStatus(404);
            }
            else {
                const {rows: bloodTypes} = await bloodTypeModel.getBloodType(user.blood_type, client);
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
    const idT = req.params.id;
    const id = parseInt(idT);

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
                const {rows: bloodTypes} = await bloodTypeModel.getBloodType(user.blood_type, client);
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