/**Rutas para la colección categorías. */

const { Router } = require ('express')
const { check } = require('express-validator')
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categoriesController')
const { existeCategoria } = require('../helpers/db-validators')
const { validarCampos, validarJWT, tieneRole } = require('../middlewares')

const router = Router () 

/**
 * {{url}}/api/categorias 
 * 
 * 
*/

// Obtener todas las categorías - público
router.get('/', obtenerCategorias)

// Obtener una categoría por ID - público
router.get('/:id', [
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    check('id').custom ( (id) => existeCategoria (id) ),
    validarCampos
], obtenerCategoria)

// Crear categoría - privado con cualquier rol o token válido
router.post ('/', [
        validarJWT,
        check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria
)

// Actualizar categoría o registro por ID - privado con token válido
router.put ('/:id', [
    validarJWT,
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    check ('nombre', 'El nombre de la Categoría es obligatorio').not().isEmpty(),
    check('id').custom ( (id) => existeCategoria (id) ),
    validarCampos
], actualizarCategoria)

// Borrar categoría o registro por ID - privado con token válido y solo si es ADMIN
router.delete ('/:id', [
    validarJWT,
    tieneRole ('ADMIN_ROLE'),
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    check('id').custom ( (id) => existeCategoria (id) ),
    validarCampos
], borrarCategoria)

module.exports = router