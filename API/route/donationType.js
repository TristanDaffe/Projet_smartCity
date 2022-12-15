const DonationTypeController = require('../controller/donationTypeDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, DonationTypeController.getAllDonationType);

router.get('/:id', JWTMiddleWare.identification, DonationTypeController.getDonationType);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationTypeController.createDonationType);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationTypeController.updateDonationType);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, DonationTypeController.deleteDonationType);

module.exports = router;