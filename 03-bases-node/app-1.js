/**Archivo que inicia la aplicación. */

const { multiplicar, multiplicarSync } = require ('./helpers/multiplicar')

console.clear()

multiplicar (5)
    .then ( data => console.log ( data ))
    .catch ( err => console.log (err))
multiplicar (18)
    .then ( data => console.log ( data ))
    .catch ( err => console.log (err))

multiplicarSync (1325)
    .then ( data => console.log ( data ))
    .catch ( err => console.log (err))


