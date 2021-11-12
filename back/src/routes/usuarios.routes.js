const express = require('express')
const router = express.Router()
const auth = require('../middlewars/auth')

const controllerUsers = require('../controllers/usuarios.controllers')
const { LoginUser, RegisterUser, LogoutUser, GetAllUsers, GetOneUser, ModifyOneUser, DeleteOneUSer } = controllerUsers

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/logout', auth(['true', 'false']), LogoutUser)

/* -----CRUD------ */
router.get('/', GetAllUsers)
router.get('/:id', GetOneUser)
router.put('/:id', ModifyOneUser)
router.delete('/:id', DeleteOneUSer)
/* ---------------------------------- */

module.exports = router;
