/**Controladores para el producto */

const { response } = require('express')
const res = require('express/lib/response')
const { Producto, Categoria } = require('../models')

// Obtenemos listado de productos paginado, con total y con populate
const obtenerProductos = async (req, res = response) => {
    // recuperamos los params. También se puede desestructurar
    const { limite = 5, desde = 0 } = req.query

    const [ total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true}),
        Producto.find({ estado: true})
                .populate('usuario','nombre')
                .populate('categoria','nombre')
                .skip ( Number (desde))
                .limit (Number (limite))
    ])

    res.json({
        ok: true,
        message: "Controlador - Petición GET a Productos",
        total,
        productos
    })
}

// Obtenemos un producto determinado
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params
    const producto = await Producto.findById(id)
                            .populate ( 'usuario', 'nombre')
                            .populate ( 'categoria', 'nombre')

    res.json({
        ok: true,
        message: "Obtenemos un producto  determinada",
        id,
        producto,
    })

}


// Creamos una Producto
const crearProducto = async (req, res = response) => {
    // const nombre = req.body.nombre.toUpperCase()
    const { nombre, precio, categoria, descripcion = ''} = req.body

    const productoDB = await Producto.findOne({ nombre })
   
    if ( productoDB ) {
        return res.status(400).json ({ 
            msg: `El producto ${ productoDB.nombre} ya existe.`
        })
    }

    // Validamos que la categoría que viene sí exista
    const categoriaExiste = await Categoria.findById ( categoria )
    if ( !categoriaExiste ) {
        return res.status(400).json ({ 
            msg: `La categoría con ID ${ categoria } no está registrada.`
        })
    }

    // generar la data que se va a guardar.
    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuarioAutenticado._id,
        precio,
        categoria,
        descripcion
    }

    // hacer la grabación física.
    const producto = new Producto ( data )
    await producto.save()

    res.status(201).json({
        msg: 'Producto creado',
        producto
        // Producto
    })
}

// actualizamos un producto.
const actualizarProducto = async (req, res = response) => {
    // El id a actualizar viene como parámetro
    const { id } = req.params
    const { nombre, precio, categoria, descripcion } = req.body
    
    // Actualizamos registro y el usuario que lo modificó.
    const data = {
        usuario: req.usuarioAutenticado._id,
        descripcion
    }

    if ( nombre ) {
        data.nombre = nombre.toUpperCase()
    }

    // si se envió el precio, se agregará el precio, siempre que sea mayor que cero
    if ( precio ) { 
        if ( precio < 0) {
            return res.status(400).json ({
                msg: 'El precio enviado es menor a cero. Corregir'
            })
        }
        data.precio = precio
    }
    // Si el id de la categoría es correcto, entonces ver si existe.
    if ( categoria ) { 
        const categoriaExiste = await Categoria.findById ( categoria )
        if ( !categoriaExiste ) {
            return res.status(400).json ({ 
                msg: `La categoría con ID ${ categoria } no está registrada.`
            })
        }
        data.categoria = categoria
    }

    const producto = await Producto.findByIdAndUpdate ( id, data, { new: true} )

    res.json({
        ok: true,
        message: "Producto actualizado",
        producto
    })
}

// borramos un producto
const borrarProducto = async (req, res = response) => {
    // El id a actualizar viene como parámetro
    const { id } = req.params

    // Actualizamos registro
    const producto = await Producto.findByIdAndUpdate ( id, { estado: false }, { new: true}  )

    res.json({
        ok: true,
        message: "Producto eliminado de manera lógica",
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}