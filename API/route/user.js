const UserConroller = require('../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, UserConroller.getUser);
router.post('/login', UserConroller.loginUser);
router.post('/register', UserConroller.registerUser);
// router.patch('/user', UserConroller.patchUser);
// router.delete('/user', UserConroller.deleteUser);

module.exports = router;