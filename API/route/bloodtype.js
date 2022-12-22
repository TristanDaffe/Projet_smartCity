const BloodController = require('../controller/bloodTypeDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

/**
 * @swagger
 * /bloodtype/all:
 *  get:
 *   description: Get all blood types
 *   tags:
 *    - BloodType
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     $ref: '#/components/responses/BloodTypesFound'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    
 */
router.get('/all', JWTMiddleWare.identification, BloodController.getAllBloodType);
/**
 * @swagger
 * /bloodtype/name:
 *  post:
 *   description: Get a blood type by name
 *   tags:
 *    - BloodType
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    $ref: '#/components/requestBodies/BloodTypeName'
 *   responses:
 *    200:
 *     $ref: '#/components/responses/BloodTypeFound'
 *    400:
 *     $ref: '#/components/responses/IdUndefined'
 *    404:
 *     $ref: '#/components/responses/BloodTypeNotFound'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    
 */
router.post('/name', JWTMiddleWare.identification, BloodController.getBloodTypeFromName);
/**
 * @swagger
 * /bloodtype/{id}:
 *  get:
 *   description: Get a blood type by id
 *   tags:
 *    - BloodType
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     $ref: '#/components/responses/BloodTypeFound'
 *    400:
 *     $ref: '#/components/responses/IdUndefined'
 *    404:
 *     $ref: '#/components/responses/BloodTypeNotFound'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    
 */
router.get('/:id', JWTMiddleWare.identification, BloodController.getBloodType);
/**
 *@swagger
 * /bloodtype:
 *  post:
 *     description: Create a new blood type
 *     tags:
 *      - BloodType
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      400:
 *        $ref: '#/components/responses/BloodTypeUndefined'
 *      409:
 *        $ref: '#/components/responses/BloodTypeAlreadyExists'
 *      201:
 *        $ref: '#/components/responses/BloodTypeCreated'
 *      401:
 *        $ref: '#/components/responses/ErrorJWT'
 *      403:
 *        $ref: '#/components/responses/MissingJWT'
*/
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.createBloodType);
/**
 * @swagger
 * /bloodtype:
 *  patch:
 *   description: Update a blood type
 *   tags:
 *    - BloodType
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    $ref: '#/components/requestBodies/BloodTypeToUpdate'
 *   responses:
 *    200:
 *     $ref: '#/components/responses/BloodTypeUpdated'
 *    404:
 *     $ref: '#/components/responses/BloodTypeNotFound'
 *    400:
 *      $ref: '#/components/responses/ErrorJWT'
 *    401:
 *      $ref: '#/components/responses/MissingJWT'
 *    403:
 *      $ref: '#/components/responses/mustBeManager'
 *    500:
 *      description: Erreur serveur  
 */
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.updateBloodType);
/**
 * @swagger
 * /bloodtype/{id}:
 *  delete:
 *   description: Delete a blood type
 *   tags:
 *    - BloodType
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     $ref: '#/components/responses/BloodTypeDeleted'
 *    400:
 *     $ref: '#/components/responses/IdUndefined'
 *    404:
 *     $ref: '#/components/responses/BloodTypeNotFound'
 *    409:
 *     $ref: '#/components/responses/BloodTypeInUse'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    403:
 *     $ref: '#/components/responses/MissingJWT'
 *    500:
 *     description: Erreur serveur 
*/
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.deleteBloodType);

module.exports = router;