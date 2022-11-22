const UserControleur = require("../controleur/achatDB");

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserControleur.insertUser);
router.get('/:login/:password', UserControleur.getUsers);
router.pach('/:id', UserControleur.updateUser);
router.delete('/:id/:password', UserControleur.deleteUser);

module.exports = router;