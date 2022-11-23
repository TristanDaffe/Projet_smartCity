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