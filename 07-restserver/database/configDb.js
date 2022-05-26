/**Configuramos el acceso a la base de datos de MongoDb*/

const mongoose = require ('mongoose')

const dbConnection = async () => {
    try {
        // await mongoose.connect (process.env.MONGODB_CNN, {
        mongoose.connect (process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log ('Base de datos en línea. Perfecto!!')
    } catch (error) {
        console.log (error)
        throw new Error ('Error a la hora de conectarse a la base de datos.')
    }
}

module.exports = {
    dbConnection
}