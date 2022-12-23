const UserRouter = require('./user');
const BloodRouter = require('./bloodtype');
const DonationRouter = require('./donation');
const LocalityRouter = require('./locality');
const DonationCenterRouter = require('./donationCenter');
const OpeningDayRouter = require('./openingDay');
const DonationTypeRouter = require('./donationType');
const DonationIntervalleRouter = require('./donationInterval');

const router = require('express').Router();

router.use("/1.0/user", UserRouter);
router.use("/1.0/bloodtype", BloodRouter);
router.use("/1.0/donation", DonationRouter);
router.use("/1.0/locality", LocalityRouter);
router.use("/1.0/center", DonationCenterRouter);
router.use("/1.0/openingday", OpeningDayRouter);
router.use("/1.0/donationtype", DonationTypeRouter);
router.use('/1.0/donationinterval', DonationIntervalleRouter)

module.exports = router;