const UserConroller = require('../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;

router.get('/user', UserConroller.getUserFromLogin);
router.post('/user', UserConroller.postUser);
router.patch('/user', UserConroller.patchUser);
router.delete('/user', UserConroller.deleteUser);

module.exports = router;