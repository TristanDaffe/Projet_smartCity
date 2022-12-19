const BloodController = require('../controller/bloodTypeDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, BloodController.getAllBloodType);

router.get('/name', JWTMiddleWare.identification, BloodController.getBloodTypeFromName);
router.get('/:id', JWTMiddleWare.identification, BloodController.getBloodType);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.createBloodType);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.updateBloodType);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, BloodController.deleteBloodType);

module.exports = router;