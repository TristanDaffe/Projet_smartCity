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