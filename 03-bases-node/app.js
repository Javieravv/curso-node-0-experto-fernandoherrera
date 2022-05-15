/**Archivo que inicia la aplicación. 
 * para trabajar con argumentos que vienen de la consola.
 * 
*/
const { multiplicar, multiplicarSync } = require ('./helpers/multiplicar')
const argv = require ('./yargs/configyargs')
                
console.clear()

console.log ( argv )

multiplicarSync (argv.b, argv.l, argv.h)

