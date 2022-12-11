const LocalityController = require('../controller/localityDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/:id', JWTMiddleWare.identification,LocalityController.getLocality);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.createLocality);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.updateLocality);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.deleteLocality);

router.post('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, LocalityController.getAllLocalities);

module.exports = router;