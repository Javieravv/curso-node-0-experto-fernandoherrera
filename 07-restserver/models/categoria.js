/**Modelo para la tabla categorías */

const { Schema, model} = require('mongoose')

const CategoriaSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre de categoría es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

// Sobres escribir métodos para evitar que se muestre un campo determinado.

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data} = this.toObject()
    return data
}

module.exports = model ( 'Categoria', CategoriaSchema )
