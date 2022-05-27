/**Modelo para la tabla del usuario */

const { Schema, model} = require('mongoose')

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password del usuario  es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

// Sobres escribir métodos para evitar que se muestre un campo determinado.

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id // para que devuelva uid y no _id.
    return usuario
}

module.exports = model ( 'Usuario', UsuarioSchema )
