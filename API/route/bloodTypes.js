const BloodController = require('../controller/bloodTypeDB');
const Router = require("express-promise-router");
const router = new Router;

router.get('/', BloodController.getBloodTypes);

module.exports = router;