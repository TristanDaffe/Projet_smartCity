const OpeningDayController = require('../controller/openingDayDB');
const Router = require("express-promise-router");
const router = new Router;
const JWTMiddleWare = require("../middleware/identificationJWT");
const AuthMiddleWare = require("../middleware/authorization");

router.get('/all', JWTMiddleWare.identification, OpeningDayController.getAllOpeningDays);

router.get('/:id', JWTMiddleWare.identification, OpeningDayController.getOpeningDay);
router.get('/day/:day', JWTMiddleWare.identification, OpeningDayController.getOpeningForDay);
router.post('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, OpeningDayController.createOpeningDay);
router.patch('/', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, OpeningDayController.updateOpeningDay);
router.delete('/:id', JWTMiddleWare.identification, AuthMiddleWare.mustBeAdmin, OpeningDayController.deleteOpeningDay);

module.exports = router;