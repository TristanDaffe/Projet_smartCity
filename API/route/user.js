const UserConroller = require('../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.getAllUsers);

router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.getUser);
router.post('/login', UserConroller.loginUser);
router.post('/register', UserConroller.registerUser);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.patchUser);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.deleteUser);

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
 *         ref: "#/components/responses/AllUsers"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
*/

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
 *      $ref: "#/components/responses/UserFound"
 *     400:
 *      description: Id is not a number
 *     404:
 *      description: User not found
 *     401:
 *      description: Unauthorized
 *     403:
 *      description: Forbidden
 *     500:
 *      description: Internal Server Error
 * 
*/

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

/**
 * @swagger
 * /user/register:
 * post:
 *    tags:
 *       - User
 *    requestBody:
 *       $ref: "#/components/requestBodies/Register"
 *    responses:
 *      200:
 *       $ref: "#/components/responses/Token"
 *      412:
 *       description: A field is invalid
 *      409:
 *       description: Login or email already exists
 *      404:
 *       description: Blood type not found
 *      500:
 *       description: Internal Server Error
*/

/**
 * @swagger
 * /user:
 * patch:
 *  tags:
 *       - User
 *  security:
 *       - bearerAuth: []
 *  requestBody:
 *       $ref: "#/components/requestBodies/Update"
 *  responses:
 *      200:
 *       $ref: "#/components/responses/Token"
 *      412:
 *       description: A field is invalid
 *      409:
 *       description: Login or email already exists
 *      404:
 *       description: User not found
 *      401:
 *       description: Unauthorized
 *      403:
 *       description: Forbidden
 *      500:
 *       description: Internal Server Error
*/

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
 *          description: User deleted
 *      400:
 *          description: Id is not a number
 *      404:
 *          description: User not found
 *      401:
 *          description: Unauthorized
 *      403:
 *          description: Forbidden
 *      500:
 *          description: Internal Server Error
*/