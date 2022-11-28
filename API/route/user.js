const UserConroller = require('../controller/userDB');
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', UserConroller.getUser);
router.post('/', UserConroller.getUserFromLogin);
// router.patch('/user', UserConroller.patchUser);
// router.delete('/user', UserConroller.deleteUser);

module.exports = router;