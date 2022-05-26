/**Validadores para la base de datos. */
const Role = require ('../models/role')
const Usuario = require ('../models/usuario')


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( { rol })
    if ( !existeRol ) {
        throw new Error (`El rol ${ rol } no está registrado en la Bd.`)
    }
}

const existeEmail = async ( correo = '') => {
    const existMail = await Usuario.findOne({ correo })
    if ( existMail ) {
        throw new Error (`El correo  ${ correo } ya  está registrado en la Bd.`)
    }

}

const existeUsuarioPorId = async ( userId = '') => {
    console.log ('USURIO ID ', userId)
    const existeUsuario = await Usuario.findById(userId) 
    if ( !existeUsuario ) {
        throw new Error (`El usuario con Id ${ userId } no está registrado en la Bd`)
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}