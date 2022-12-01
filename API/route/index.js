const UserRouter = require('./user');
const BloodRouter = require('./bloodtype');
const router = require('express').Router();

router.use("/user", UserRouter);
router.use("/bloodtype", BloodRouter);

module.exports = router;