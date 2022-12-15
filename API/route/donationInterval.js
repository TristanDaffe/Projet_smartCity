const DonationIntervalController = require('../controller/donationIntervalDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, DonationIntervalController.getAllDonationIntervals);

router.get('/:id', JWTMiddleWare.identification, DonationIntervalController.getDonationInterval);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationIntervalController.createDonationIntervals);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationIntervalController.updateDonationInterval);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationIntervalController.deleteDonationInterval);

module.exports = router;