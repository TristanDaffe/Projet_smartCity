const UserConroller = require('../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");


module.exports = router;

/**
 * @swagger
 * /user/all:
 * get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: "#/components/responses/AllUsers"
 *       400:
 *         $ref: '#/components/responses/ErrorJWT'
 *       401:
 *         $ref: '#/components/responses/MissingJWT'
 *       403:
 *         $ref: '#/components/responses/mustBeManager'
 *       500:
 *         description: Erreur serveur
*/
router.get('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 * get:
 *  tags:
 *    - User
 *  security:
 *    - bearerAuth: []
 *  parameters:
 *    - name: id
 *      description: id of the user
 *      in: path
 *      required: true
 *      schema:
 *       type: integer
 *  responses:
 *     200:
 *         $ref: "#/components/responses/UserFound"
 *     404:
 *         description: User not found
 *     400:
 *         $ref: '#/components/responses/ErrorJWT'
 *     401:
 *         $ref: '#/components/responses/MissingJWT'
 *     403:
 *         $ref: '#/components/responses/mustBeManager'
 *     500:
 *         description: Erreur serveur
*/
router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.getUser);

/**
 * @swagger
 * /user/login:
 * post:
 *    tags:
 *         - User
 *    requestBody:
 *         $ref :"#components/requestBodies/Login"
 *    responses:
 *     200:
 *         $ref: "#/components/responses/Token"
 *     404:
 *         description: User not found
 *     412:
 *         description: Login or password is empty
 *     500:
 *         description: Internal Server Error
*/
router.post('/login', UserConroller.loginUser);

/**
 * @swagger
 * /user/register:
 * post:
 *    tags:
 *       - User
 *    requestBody:
 *       $ref: "#/components/requestBodies/UserCreate"
 *    responses:
 *      200:
 *       $ref: "#/components/responses/User"
 *      412:
 *       description: A field is invalid
 *      409:
 *       description: Login or email already exists
 *      404:
 *       description: Blood type not found
 *      500:
 *       description: Internal Server Error
*/
router.post('/register', UserConroller.registerUser);

/**
 * @swagger
 * /user:
 * patch:
 *  tags:
 *       - User
 *  security:
 *       - bearerAuth: []
 *  requestBody:
 *       $ref: "#/components/requestBodies/PatchUser"
 *  responses:
 *      200:
 *       $ref: "#/components/responses/UserUpdated"
 *      412:
 *       description: A field is invalid
 *      409:
 *       description: Login or email already exists
 *      404:
 *       description: User not found
 *      400:
 *          $ref: '#/components/responses/ErrorJWT'
 *      401:
 *          $ref: '#/components/responses/MissingJWT'
 *      403:
 *          $ref: '#/components/responses/mustBeManager'
 *      500:
 *          description: Erreur serveur
*/
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.patchUser);

/**
 * @swagger
 * /user/{id}:
 * delete:
 *  tags:
 *      - User
 *  security:
 *      - bearerAuth: []
 *  parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        schema:
 *           type: integer
 *  responses:
 *      200:
 *          $ref: "#/components/responses/UserDeleted"
 *      404:
 *          description: User not found
 *      400:
 *          $ref: '#/components/responses/ErrorJWT'
 *      401:
 *          $ref: '#/components/responses/MissingJWT'
 *      403:
 *          $ref: '#/components/responses/mustBeManager'
 *      500:
 *          description: Erreur serveur
*/
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.deleteUser);
