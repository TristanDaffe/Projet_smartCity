const DonationIntervalleController = require('../controller/donationIntervalleController');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, DonationIntervalleController.getAllDonationIntervalles);

router.get('/:id', JWTMiddleWare.identification, DonationIntervalleController.getDonationIntervalle);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationIntervalleController.updateDonationIntervalle);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationIntervalleController.deleteDonationIntervalle);

module.exports = router;