const DonationController = require('../controller/donationDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.getAllDonation);

router.get('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.getDonation);
router.get('/user/:id/last', JWTMiddleWare.identification, DonationController.getLastDonationOfEveryTypeOfUser);
router.get('/user/:id', JWTMiddleWare.identification,DonationController.getDonationsOfUser);
router.post('/', JWTMiddleWare.identification, DonationController.createDonation);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.updateDonation);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationController.deleteDonation);


module.exports = router;