/**Rutas para los productos. */

const { Router } = require ('express')
const { check } = require('express-validator')
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productosController')
const { existeProducto } = require('../helpers/db-validators')
const { validarCampos, validarJWT, tieneRole } = require('../middlewares')

const router = Router () 

/**
 * {{url}}/api/productos 
 * 
*/

// Obtener todos los productos - público
router.get('/', obtenerProductos)

// Obtener un producto por ID - público
router.get('/:id', [
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    check('id').custom ( (id) => existeProducto (id) ),
    validarCampos
], obtenerProducto)

// Crear producto - privado con cualquier rol o token válido
router.post ('/', [
        validarJWT,
        check ('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check ('categoria', 'El ID de la categoría es un id inválido de MongoDb').isMongoId(),
        validarCampos
    ], crearProducto
)

// Actualizar producto o registro por ID - privado con token válido
router.put ('/:id', [
    validarJWT,
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    // check ('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('id').custom ( (id) => existeProducto (id) ),
    validarCampos
], actualizarProducto)

// Borrar producto o registro por ID - privado con token válido y solo si es ADMIN
router.delete ('/:id', [
    validarJWT,
    tieneRole ('ADMIN_ROLE'),
    check('id', 'No es un id válido de MongoDb').isMongoId(),
    check('id').custom ( (id) => existeProducto (id) ),
    validarCampos
], borrarProducto)

module.exports = router