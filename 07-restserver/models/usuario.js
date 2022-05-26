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
    const { __v, password, ...usuario} = this.toObject()
    return usuario
}

module.exports = model ( 'Usuario', UsuarioSchema )
