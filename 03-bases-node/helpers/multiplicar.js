/**Arcivo que contendrá funciones varias.  */
const fs = require('fs');

const multiplicar = ( number = 15) => {
    return new Promise ( ( resolve, reject ) => {
        let salida = `TABLA DE MULTIPLICAR DEL ${ number }\n`
        console.log (`=======================================`)
        console.log (`TABLA DE MULTIPLICAR DE ${number}`)
        console.log (`=======================================`)

        for (let n = 1; n <= 10; n++) {
            salida += `${ number } x ${ n } = ${ number * n}\n`
        }
        console.log (salida)
        fs.writeFileSync ( `tablamu-${number}.txt`, salida )
        resolve(`Tabla de multiplicar de ${ number } guardada`)
    })
}

// Esta es la manera recomendada.
const multiplicarSync = async ( number = 15, listar = false, hasta = 10) => {
    try {
        let salida = `TABLA DE MULTIPLICAR DEL ${ number }\n`
        console.log (`=======================================`)
        console.log (`TABLA DE MULTIPLICAR DE ${number}`)
        console.log (`=======================================`)

        for (let n = 1; n <= hasta; n++) {
            salida += `${ number } x ${ n } = ${ number * n}\n`
        }
        // si listar es true se imprime en consola.
        listar && console.log (salida)
        fs.writeFileSync ( `./salida/tabla-mult-${number}.txt`, salida )
        return `Tabla de multiplicar de ${ number } guardada`
    } catch (error) {
        throw error
    }
}

module.exports = { multiplicar, multiplicarSync }
