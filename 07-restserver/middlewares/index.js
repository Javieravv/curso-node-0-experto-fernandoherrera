/**Con este archhivo unificamos los middlewares que están en en la carpeta */

const validarCampos  = require('../middlewares/validar-campos')
const validarJWT     = require('../middlewares/validar-jwt')
const validarRoles   = require('../middlewares/validar-roles')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}
