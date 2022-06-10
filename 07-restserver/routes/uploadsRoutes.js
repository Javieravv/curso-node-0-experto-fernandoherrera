const { Router } = require ('express')
const { check } = require('express-validator')
const { cargarArchivo, 
        actualizarImagenCloudinary, 
        mostrarImagenCloudinary } = require('../controllers/uploadsController')
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos, validarArchivoSubir } = require('../middlewares')

const router = Router () 

router.post ('/', [ validarArchivoSubir ], cargarArchivo)

router.put ('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser un id de Mongo').isMongoId(),
    check('coleccion').custom ( coleccion => coleccionesPermitidas ( coleccion, ['usuarios', 'productos', 'categorias'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen)

router.get('/:coleccion/:id',[
    check('id', 'El id debe de ser un id de Mongo').isMongoId(),
    check('coleccion').custom ( coleccion => coleccionesPermitidas ( coleccion, ['usuarios', 'productos', 'categorias'])),
    validarCampos
],  mostrarImagenCloudinary)
// ],  mostrarImagen)

module.exports = router