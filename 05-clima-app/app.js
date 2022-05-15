/**Archivo de entrada de entrada */
require('colors')

const  {
     inquireMenu, 
     pausa, 
     leerInput,
     listarLugares
    } = require ('./helpers/inquirer')
const Busquedas = require('./models/busquedas')

console.clear ()
const main = async () => {
    let opt = ''
    const busqueda = new Busquedas ()
    
    do {
        // Imprimir el menú.
        opt = await inquireMenu ()
        switch (opt) {
            case 1:
                // Buscar ciudad
                // mostrar mensaje
                const lugar = await leerInput('Lugar que quiere buscar: ')
                // Buscar lugares
                const lugares = await busqueda.buscarLugar ( lugar )
                
                // seleccionar lugar
                const idLugarSeleccionado = await listarLugares ( lugares )
                if ( idLugarSeleccionado !== 0 ) {
                    const lugarSel = lugares.find ( l => l.id === idLugarSeleccionado)
                    // grabamos historial
                    busqueda.agregarHistorial ( lugarSel.nombre )
    
                    // hacer petición http a otro endpoint para averiguar temperatura

                    const temperaturaLugar = await busqueda.buscarClimaLugar ( lugarSel.lat, lugarSel.lng )
   
                    // mostrar resultados
                    console.log ('\nInformación de la ciudad\n'.blue)
                    console.log ('Ciudad: ', lugarSel.nombre.red)
                    console.log ('Latitud: ', lugarSel.lat)
                    console.log ('Longitud: ', lugarSel.lng)
                    console.log ('Temperatura: ', temperaturaLugar.temperatura.yellow)
                    console.log ('Mínima: ', temperaturaLugar.tempMinima)
                    console.log ('Máxima: ', temperaturaLugar.tempMaxima)
                    console.log ('¿Cómo está el clima?: ', temperaturaLugar.descripcion.red)
                    console.log ()
                }
                break;
            case 2:
                // Listar historial
                busqueda.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1}. `.blue
                    console.log (`${ idx } ${ lugar }`)
                });
                break;
            default:
                break;
        }
        ( opt !== 0) && await pausa()
    } while ( opt !== 0);
    console.clear()
}

main ()
