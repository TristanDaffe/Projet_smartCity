const BloodController = require('../controller/bloodTypeDB');
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', BloodController.getBloodType);
router.get('/', BloodController.getBloodTypeFromName);
router.post('/', BloodController.createBloodType);
router.patch('/', BloodController.updateBloodType);

module.exports = router;