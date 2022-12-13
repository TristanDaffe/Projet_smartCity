const CenterController = require('../controller/donationCenterDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, CenterController.getAllDonationCenters);

router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, CenterController.getDonationCenter);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, CenterController.createDonationCenter);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, CenterController.updateDonationCenter);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, CenterController.deleteDonationCenter);

router.post('/opening/:id', JWTMiddleWare.identification, CenterController.getOpeningDaysForCenter);


module.exports = router;