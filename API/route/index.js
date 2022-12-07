const UserRouter = require('./user');
const BloodRouter = require('./bloodtype');
const DonationRouter = require('./donation');

const router = require('express').Router();

router.use("/user", UserRouter);
router.use("/bloodtype", BloodRouter);
router.use("/donation", DonationRouter);

module.exports = router;