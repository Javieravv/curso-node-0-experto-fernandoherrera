/**Configuración de yargs. */

const argv = require('yargs')
    .option ('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es labase de la tabla de multiplicar'
    })
    .option ('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla en consola.'
    })
    .option ('h', {
        alias: 'hasta',
        type: 'number',
        demandOption: true,
        default: 10,
        describe: 'Es el valor máximo hasta el cual quiere multiplicarse'
    })
    .check ( (argv, optios) => {
        if ( isNaN(argv.base )) {
            throw ' La base tiene que ser un número '
        }   
        if ( isNaN(argv.hasta )) {
            throw ' El valor máximo tiene que ser un número. '
        }   
        return true
    })
    .argv

module.exports = argv