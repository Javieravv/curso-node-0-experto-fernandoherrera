/**Ruta para las búsquedas.  */

const { Router } = require ('express')
const { buscarBd } = require('../controllers/buscarController')


const router = Router () 

router.get ('/:coleccion/:termino', buscarBd)


module.exports = router