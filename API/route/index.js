const UserRouter = require('./user');
const BloodRouter = require('./bloodtype');
const BloodsRouter = require('./bloodTypes');
const router = require('express').Router();

router.use("/user", UserRouter);
router.use("/bloodtype", BloodRouter);
router.use("/bloodtypes", BloodsRouter);

module.exports = router;