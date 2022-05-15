/**Interacciones para guardar y leer las tareas en un archivo. */
const fs = require ('fs')
const archivo = './db/dataTareas.json'

const guardarDb = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data))
}

const leerDB = () => {
    if ( !fs.existsSync ( archivo ) ) {
        return null
    }
    const infoTareas = fs.readFileSync ( archivo, { encoding: 'utf-8' } )
    const data = JSON.parse( infoTareas )
    console.log (data)
    return data
}

module.exports = { 
    guardarDb,
    leerDB,
}