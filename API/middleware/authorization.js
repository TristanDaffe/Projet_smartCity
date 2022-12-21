module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}

/**
*@swagger
* components:
*   responses:
*       mustBeManager:
*           description: L'action demandée ne peut être réalisée que par un manager
*/