const DonationController = require('../controller/donationDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.getDonation);
router.get('/user/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin,DonationController.getDonationsOfUser);
router.post('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.getAllDonation);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.createDonation);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.updateDonation);

module.exports = router;