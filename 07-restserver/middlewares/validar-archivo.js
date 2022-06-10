/**Se valida el archivo que se va a subir */

const validarArchivoSubir = ( req, res, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos por subir -- Archivo.'});    
    }
    next ()
}

module.exports = {
    validarArchivoSubir
}