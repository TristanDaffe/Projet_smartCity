const LocalityController = require('../controller/localityDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

/**
 * @swagger
 * /locality/all:
 *  get:
 *   description: Get all localities
 *   tags:
 *    - Locality
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     $ref: '#/components/responses/LocalitiesFound'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    
 */
router.get('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.getAllLocalities);

/**
 * @swagger
 * /locality/{id}:
 *  get:
 *   description: Get a locality by id
 *   tags:
 *    - Locality
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
 *     $ref: '#/components/responses/LocalityFound'
 *    400:
 *     $ref: '#/components/responses/IdUndefined'
 *    404:
 *     $ref: '#/components/responses/LocalityNotFound'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    
 */
router.get('/:id', JWTMiddleWare.identification,LocalityController.getLocality);
/**
 *@swagger
 * /locality:
 *  post:
 *     description: Create a new blood type
 *     tags:
 *      - Locality
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      400:
 *        $ref: '#/components/responses/LocalityNameUndefined'
 *      409:
 *        $ref: '#/components/responses/LocalityAlreadyExists'
 *      201:
 *        $ref: '#/components/responses/LocalityCreated'
 *      401:
 *        $ref: '#/components/responses/ErrorJWT'
 *      403:
 *        $ref: '#/components/responses/MissingJWT'
*/
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.createLocality);
/**
 * @swagger
 * /locality:
 *  patch:
 *   description: Update a locality
 *   tags:
 *    - Locality
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    $ref: '#/components/requestBodies/LocalityToUpdate'
 *   responses:
 *    200:
 *     $ref: '#/components/responses/LocalityUpdated'
 *    404:
 *     $ref: '#/components/responses/LocalityNotFound'
 *    400:
 *      $ref: '#/components/responses/ErrorJWT'
 *    401:
 *      $ref: '#/components/responses/MissingJWT'
 *    403:
 *      $ref: '#/components/responses/mustBeManager'
 *    500:
 *      description: Erreur serveur  
 */
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.updateLocality);
/**
 * @swagger
 * /locality/{id}:
 *  delete:
 *   description: Delete a locality
 *   tags:
 *    - Locality
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
 *     $ref: '#/components/responses/LocalityDeleted'
 *    400:
 *     $ref: '#/components/responses/IdUndefined'
 *    404:
 *     $ref: '#/components/responses/LocalityNotFound'
 *    409:
 *     $ref: '#/components/responses/LocalityInUse'
 *    401:
 *     $ref: '#/components/responses/ErrorJWT'
 *    403:
 *     $ref: '#/components/responses/MissingJWT'
 *    500:
 *     description: Erreur serveur 
*/
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.deleteLocality);

module.exports = router;