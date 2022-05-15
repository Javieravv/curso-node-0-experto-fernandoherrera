/**punto de inicio */

require('colors')
const { guardarDb, leerDB } = require('./helpers/guardarTareas')
const { inquireMenu, 
    pausa,
    leerInput, 
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCheckList
} = require('./helpers/inquirer')

const Tareas = require('./models/tareas')

// const { mostrarMenu, pausa } = require('./helpers/mensajes')


const main = async () => {
    let opt = ''
    const tareas = new Tareas()
    const tareasDb = leerDB ()

    if (  tareasDb ) {
        // establecemos tareas a memoria
        tareas.cargarTareasFromArray ( tareasDb )
    }


    do {
        // Imprimir el menú.
        opt = await inquireMenu()
        switch (opt) {
            case '1':
                const desc = await leerInput ('Descripción de la Tarea:')
                tareas.crearTarea(desc)
                break;
            case '2':
                // Listar
                tareas.listadoCompletoTareas()
                break;
            case '3':
                // Listar
                tareas.listarTareasPendientesCompletadas()
                break;
            case '4':
                // Listar
                tareas.listarTareasPendientesCompletadas(false)
                break;
            case '5':
                // Completar tareas | pendiente
                const ids = await listadoTareasCheckList ( tareas.listadoArr )
                tareas.toggleCompletadas ( ids )
                await pausa ()
                break;
            case '6':
                // Borrar 
                const idTarea    = await listadoTareasBorrar (tareas.listadoArr)
                if ( idTarea !== '0') {
                    const confBorrar = await confirmarAccion('¿Está seguro de borrar esta tarea?')
                    if ( confBorrar ) {
                        tareas.borrarTarea ( idTarea )
                        console.log ( 'Tarea borrada. Espero no te arrepientas..!!')
                    }
                }
                break;
            default:
                break;
        }
        // siempre grabe las tareas.
        guardarDb( tareas.listadoArr )
        await pausa()
    } while ( opt !== '0');
    console.clear()
}

main ()
