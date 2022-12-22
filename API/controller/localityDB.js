const pool = require('../model/database');
const LocalityModel = require("../model/localityDB");

/**
 * @swagger
 * components:
 *  schemas:
 *   Locality:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      postalCode:
 *        type: integer
 *      name:
 *        type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *   LocalityFound:
 *    description: Locality type found
 *    content:
 *      application/json:    
 *       schema:
 *        $ref: '#/components/schemas/Locality'
 *   IdUndefined:
 *     description: Id is undefined
 *   LocalityNotFound:
 *     description: Locality not found
 */
module.exports.getLocality = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: localities} = await LocalityModel.getLocality(id, client);
            const locality = localities[0];
            
            if(locality === undefined) {
                res.status(404).send('Locality not found');
            }   
            else {
                res.json(locality);
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

/**
 *@swagger
 * components:
 *  responses:
 *     LocalityCreated:
 *      description: Locality created
 *     LocalityAlreadyExists:
 *      description: Locality already exists
 *     LocalityNameUndefined:
 *      description: Name or postalcode is undefined
 *  requestBodies:
 *   Locality:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *         postalCode:
 *          type: integer
 *        required:
 *        - postalCode
 *        - name
 */
module.exports.createLocality = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { name, postalCode } = body;
    try {
        if(name === undefined) {
            res.status(400).send("Name is undefined");
        }
        else if(postalCode === undefined) {
            res.status(400).send("Postal code is undefined");
        }
        else {
            const {rows: localities} = await LocalityModel.getLocalityFromName(name, postalCode, client);
            const locality = localities[0];
            if(locality !== undefined) {
                res.status(400).send("Locality already exists");
            }
            else{
                await LocalityModel.createLocality(name, postalCode, client);
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
/**
 * @swagger
 * components:
 *  responses:
 *   LocalityUpdated:
 *    description: Locality updated
 *  requestBodies:
 *   LocalityToUpdate:
 *    content:
 *     application/json:
 *      schema:
 *       type: object 
 *       properties:
 *        id:
 *         type: integer
 *        name:
 *         type: string
 *        postalCode:
 *         type: integer
 */
module.exports.updateLocality = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { id, name, postalCode } = body;

    try {
        if(id === undefined) {
            res.status(400).send("Id is undefined");
        }
        else if(name === undefined) {
            res.status(400).send("Name is undefined");
        }
        else if(postalCode === undefined) {
            res.status(400).send("Postal code is undefined");
        }
        else {
            await LocalityModel.updateLocality(id, name, postalCode, client);
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
/**
 * @swagger
 * components:
 *  responses:
 *    LocalityDeleted:
 *     description: Locality deleted
 *    LocalityInUse:
 *     description: Locality is used by users
 */
module.exports.deleteLocality = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            await LocalityModel.deleteLocality(id, client);
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
/**
 * @swagger
 * components:
 *  schemas:
 *   Localities:
 *    type: array
 *    items:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       postalCode:
 *         type: integer
 */
/**
 * @swagger
 * components:
 *  responses:
 *   LocalitiesFound:
 *    description: Localities found
 *    content:
 *      application/json:    
 *       schema:
 *        $ref: '#/components/schemas/Localities'
 */
module.exports.getAllLocalities = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: localities} = await LocalityModel.getAllLocalities(client);
        res.json(localities);
    }
    catch (error) {
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
}