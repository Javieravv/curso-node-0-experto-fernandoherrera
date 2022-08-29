/**Validadores para la base de datos. */
const { Categoria, Usuario, Role, Producto } = require('../models')


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
    const existeUsuario = await Usuario.findById(userId) 
    if ( !existeUsuario ) {
        throw new Error (`El usuario con Id ${ userId } no está registrado en la Bd`)
    }
}

const existeCategoria = async ( categoriaId = '') => {
    const existeCategoria = await Categoria.findById( categoriaId ) 
    if ( !existeCategoria ) {
        throw new Error (`La categoría con Id ${ categoriaId } no está registrado en la Bd`)
    }
}

const existeProducto = async ( productoId = '') => {
    const existeProducto = await Producto.findById( productoId ) 
    if ( !existeProducto ) {
        throw new Error (`El producto con Id ${ productoId } no está registrado en la Bd`)
    }
}

const coleccionesPermitidas = ( coleccion = '', coleccionesValidas = []) => {
    const coleccionIncluida = coleccionesValidas.includes ( coleccion )
    if ( !coleccionIncluida ) {
        throw new Error (`La colección ${ coleccion } no está permitida. Las permitidas son ${ coleccionesValidas }`)
    }

    return true // si todo sale bien
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}