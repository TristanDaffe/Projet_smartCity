const UserDB = require('../model/userDB');
const pool = require('../modele/database');

module.exports.identification = async (req, res) => {
    const headerAuth = req.get('authorization');
    if(headerAuth && headerAuth.includes("Basic")){
        const base64 = headerAuth.split(" ")[1];
        const [login, password] = Buffer.from(base64, "base64").toString('utf-8').split(":");
        const client = await pool.connect();
        try {
            const {rows} = await UserDB.getUserByLogin(login, password, client);
            const user = rows[0];
            if(user !== undefined) {
                req.user = user;
                next();
            }
            else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.sendStatus(500);
        }
        finally {
            client.release();
        }
    }
    else {
        res.sendStatus(401);
    }
}

module.exports.identificationWithAuth = async(req, res, next) => {
    const headerAuth = req.get('authorization');
    if(headerAuth && headerAuth.includes("Basic")){
        const base64Login = headerAuth.split(" ")[1];
        const temp = Buffer.from(base64Login, "base64").toString('utf-8');
        const [login, password] = temp.split(":");
        const client = await pool.connect();
        try {
            const {rows: users} = await UserDB.getUserByLogin(login, password, client);
            const user = users[0];
            if(user !== undefined) {
                req.session = user;

                if(user.is_admin){
                    req.session.authLevel = "admin";
                    next();
                }
                else {
                    req.session.authLevel = "user";
                    next();
                }
            }
            else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.sendStatus(500);
        }
        finally {
            client.release();
        }
    }
    else {
        res.sendStatus(401);
    }
}