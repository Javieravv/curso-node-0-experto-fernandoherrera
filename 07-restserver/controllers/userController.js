// Controladores para las rutas de los usuarios
const { response, request } = require ('express')
const bcryptjs = require ('bcryptjs')
const Usuario = require('../models/usuario')


const userGet = async (req, res) => {
    // recuperamos los params. También se puede desestructurar
    // const query  = req.query

    const { limite = 5, desde = 0 } = req.query

    // const usuarios = await Usuario.find({ estado: true})
    //     .skip ( Number (desde))
    //     .limit (Number (limite))

    // const totalUsuarios = await Usuario.countDocuments({ estado: true})

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true})
                .skip ( Number (desde))
                .limit (Number (limite))
    ])

    res.json({
        ok: true,
        message: "Controlador - Petición GET a la app",
        total,
        usuarios
    })
}

const userPut = async (req, res) => {
    // Lo que se solicita viene en la request
    const { userId } = req.params
    const { _id, password, google, ...restoUsuario} = req.body

    if ( password ) {
        // Desea actualizar contraseña.
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        restoUsuario.password = bcryptjs.hashSync ( password, salt )
    }

    // Actualizamos registro
    const usuario = await Usuario.findByIdAndUpdate ( userId, restoUsuario )

    res.json({
        ok: true,
        message: "Controlador - Petición PUT a la app.",
        usuario
    })
}

const userPut1 = (req, res) => {
    // Lo que se solicita viene en la request
    const userId = req.params.userId
    const caracter = req.params.caracter
    res.json({
        ok: true,
        message: "Controlador1 - Petición PUT a la app.",
        userId,
        caracter
    })
}

// aquí creamos un usuario.
const userPost = async (req, res) => {
    // recibimos aquí los argumentos que vienen en el body
    // con ellos haremos algo. Se asegura limpiarlo para evitar datos peligrosos
    // const body = req.body
    
    const { nombre, correo, password, rol } = req.body
    // Si se envían campos que no estén en el modelo no se grabarán
    const usuario = new Usuario ( { nombre, correo, password, rol } )

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync ( password, salt )

    // grabamos el usuario con base en el modelo que fue creado.
    await usuario.save ()
    
    res.status(201).json({
        usuario
    })
}

const userDelete = async (req, res) => {
    // para poder borrar este usuario la ruta debe estar protegida con JWT
    // Para ello se crea un middleware en la ruta.

    const { userId } = req.params
    const usuario = await Usuario.findByIdAndUpdate(userId, { estado: false })

    res.json({
        ok: true,
        message: "Controlador - Petición DELETE a la app",
        userId,
        usuario,
    })
}

const userPatch = (req, res) => {
    res.json({
        ok: true,
        message: "Controlador - Petición PATCH a la app"
    })
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch,
    userPut1
}