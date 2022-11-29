const UserRouter = require('./user/user');
const RegisterRouter = require('./user/register');
const LoginRouter = require('./user/login');
const BloodRouter = require('./bloodtype');
const BloodsRouter = require('./bloodTypes');
const router = require('express').Router();

router.use("/login", LoginRouter);
router.use("/register", RegisterRouter);
router.use("/user", UserRouter);

router.use("/bloodtype", BloodRouter);
router.use("/bloodtypes", BloodsRouter);

module.exports = router;