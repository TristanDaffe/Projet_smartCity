const UserRouter = require('./user');
const BloodRouter = require('./bloodtype');
const DonationRouter = require('./donation');
const LocalityRouter = require('./locality');
const DonationCenterRouter = require('./donationCenter');
const OpeningDayRouter = require('./openingDay');
const DonationTypeRouter = require('./donationType');
const DonationIntervalleRouter = require('./donationIntervalle');

const router = require('express').Router();

router.use("/user", UserRouter);
router.use("/bloodtype", BloodRouter);
router.use("/donation", DonationRouter);
router.use("/locality", LocalityRouter);
router.use("/center", DonationCenterRouter);
router.use("/openingday", OpeningDayRouter);
router.use("/donationtype", DonationTypeRouter);
router.use('/donationIntervalle', DonationIntervalleRouter)

module.exports = router;