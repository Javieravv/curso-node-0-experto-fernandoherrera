/**Por ejemplo rutas relacionadas con los usuarios. */

const { Router } = require ('express')
const { check } = require('express-validator')
const { userGet,
    userPut,
    userPost,
    userDelete,
    userPatch,
    userPut1
 } = require('../controllers/userController')
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

// en el router se configuran las rutas
router.get('/',  userGet)

router.put('/:userId',[
    check('userId', 'No es un Id válido').isMongoId(),
    check('userId').custom ( (userId) => existeUsuarioPorId (userId) ),
    check ('rol').custom ( esRoleValido ),
    validarCampos
] ,userPut)

router.put('/:userId/algo/:caracter',  userPut1)

// los middlewares van a la mitad de la configuración
// Aquí colocamos las validaciones
router.post('/', [
    check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check ('password', 'El password es obligatorio').not().isEmpty(),
    check ('password', 'El password debe tener mínimo 6 letras').isLength({ min: 6 }),
    check ('correo', 'El correo ingresado no es válido').isEmail(),
    check ('correo').custom ( existeEmail ),
    // check ('rol', 'No es un rol permitido o válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check ('rol').custom ( esRoleValido ),
    validarCampos
], userPost)

// Borrar un usuario
router.delete('/:userId',[
    check('userId', 'No es un Id válido').isMongoId(),
    check('userId').custom ( (userId) => existeUsuarioPorId (userId) ),
    validarCampos
] ,userDelete)

router.patch('/', userPatch)

module.exports = router;