/**Middleware para administrar los roles */
const { response } = require('express')

const esAdminRole = (req, res = response, next) => {

    if ( !req.usuarioAutenticado ) {
        return res.status(500).json({ 
            msg: 'Se quiere verificar el fol sin validar el token del usuario primero'
        })
    }

    // vemos si el rol del usuario es administrador 
    const { rol, nombre } = req.usuarioAutenticado

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({ 
            msg: `El usuario ${ nombre } no tiene permisos de administrador `
        })
    }

    next ()
}


const tieneRole = ( ...roles  ) => {
    return ( req, res = response, next ) => {
        // Si en la request no está el usuario autenticado
        if ( !req.usuarioAutenticado ) {
            return res.status(500).json({ 
                msg: 'Se quiere verificar el rol sin validar el token del usuario primero'
            })
        }

        if ( !roles.includes ( req.usuarioAutenticado.rol ) ) {
            return res.status(401).json({ 
                msg: `El servicio pedido requiere uno de estos roles ${ roles }`
            })
        }
        next ()
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}