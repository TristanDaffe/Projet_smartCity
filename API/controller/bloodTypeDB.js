const pool = require('../model/database');
const BloodTypeModel = require("../model/bloodTypeDB");

/**
 * @swagger
 * components:
 *  schemas:
 *   BloodType:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      type:
 *        type: string
 *      rhesus:
 *        type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *   BloodTypeFound:
 *    description: Blood type found
 *    content:
 *      application/json:    
 *       schema:
 *        $ref: '#/components/schemas/BloodType'
 *   IdUndefined:
 *     description: Id is undefined
 *   BloodTypeNotFound:
 *     description: Blood type not found
 */
module.exports.getBloodType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
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
        console.log(error);
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
 *   BloodTypeFound:
 *    description: Blood type found
 *    content:
 *      application/json:    
 *       schema:
 *        $ref: '#/components/schemas/BloodType'
 *   InputUndefined:
 *     description: Type or rhesus is undefined
 *   BloodTypeNotFound:
 *     description: Blood type not found
 *  requestBodies:
 *   BloodTypeName:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties: 
 *        type:
 *         type: string
 *        rhesus:
 *         type: string
 */
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
/**
 * @swagger
 * components:
 *  schemas:
 *   BloodTypes:
 *    type: array
 *    items:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       type:
 *         type: string
 *       rhesus:
 *         type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *   BloodTypesFound:
 *    description: Blood types found
 *    content:
 *      application/json:    
 *       schema:
 *        $ref: '#/components/schemas/BloodTypes'
 */
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

/**
 *@swagger
 * components:
 *  responses:
 *     BloodTypeCreated:
 *      description: Blood type created
 *     BloodTypeAlreadyExists:
 *      description: Blood type already exists
 *     BloodTypeUndefined:
 *      description: Type or rhesus is undefined
 *  requestBodies:
 *   BloodType:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         type:
 *          type: string
 *         rhesus:
 *          type: string
 *        required:
 *        - type
 *        - rhesus
 */
module.exports.createBloodType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const { type, rhesus } = body;

    try {
        if(type === undefined || rhesus === undefined) {
            res.status(400).send('Type or rhesus is undefined');
        }
        else {
            // vérifier si le type de sang existe déjà

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
/**
 * @swagger
 * components:
 *  responses:
 *   BloodTypeUpdated:
 *    description: Blood type updated
 *  requestBodies:
 *   BloodTypeToUpdate:
 *    content:
 *     application/json:
 *      schema:
 *       type: object 
 *       properties:
 *        id:
 *         type: integer
 *        type:
 *         type: string
 *        rhesus:
 *         type: string
 */
module.exports.updateBloodType = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;

    const { id, type, rhesus } = body;
    
    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else if(type === undefined) {
            res.status(400).send('Type is undefined');
        }
        else if(rhesus === undefined) {
            res.status(400).send('Rhesus is undefined');
        }
        else {
            const {rows: bloodTypes} = await BloodTypeModel.getBloodType(id, client);
            const bloodType = bloodTypes[0];
            if(bloodType === undefined) {
                res.status(404).send('Blood type not found');
            }
            else {
                const {rows: sameTypeRhesus} = await BloodTypeModel.getBloodTypeFromName(type, rhesus, client);
                if(sameTypeRhesus.length > 0) {
                    res.status(409).send('Blood type already exists');
                }
                else {
                    await BloodTypeModel.updateBloodType(id, type, rhesus, client);
                    res.sendStatus(200);
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
/**
 * @swagger
 * components:
 *  responses:
 *    BloodTypeDeleted:
 *     description: Blood type deleted
 *    BloodTypeInUse:
 *     description: Blood type is used by users
 */
module.exports.deleteBloodType = async (req, res) => {
    const client = await pool.connect();
    const idT = req.params.id;
    const id = parseInt(idT);

    try {
        if(isNaN(id)) {
            res.status(400).send('Id is not a number');
        }
        else {
            const {rows: bloodTypes} = await BloodTypeModel.getBloodType(id, client);
            const bloodType = bloodTypes[0];
            if(bloodType === undefined) {
                res.status(404).send('Blood type not found');
            }
            else {
                const {rows: users} = await BloodTypeModel.getUsersWithBloodType(id, client);
                if(users.length > 0) {
                    res.status(409).send('Blood type is used by users');
                }
                else {
                    await BloodTypeModel.deleteBloodType(id, client);
                    res.sendStatus(200);
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