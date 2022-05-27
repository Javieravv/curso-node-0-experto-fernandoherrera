/**Rutas para la autenticación */
const { Router } = require ('express')
const { check } = require('express-validator')
const { authLogin } = require('../controllers/authController')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router () 

router.post ('/login', [
    check('correo','El correo electrónico no es válido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos 
], authLogin)

module.exports = router