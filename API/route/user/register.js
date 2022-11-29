const UserConroller = require('../../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserConroller.postUser);

module.exports = router;