/**Rutas para el usuario */

import { Router } from 'express'
import { deleteUsuario, getUsuario, getUsuarios, putUsuario, postUsuario } from './../controllers/usuariosController';


const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', postUsuario)
router.put('/:id', putUsuario)
router.delete('/:id', deleteUsuario)


export default router