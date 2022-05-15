/**Modelo para manejar3 muchas tareas */
require ('colors')
const Tarea = require("./tarea")

class Tareas {
    _listado = {} // no dbe ir aquí. Para eso es el constructor.

    // un getter
    get listadoArr () {
        const listado = []
        Object.keys(this._listado).forEach ( key => {
            listado.push ( this._listado[key] )
        })
        return listado
    }

    constructor () {
        this._listado = {}
    }

    borrarTarea ( id = '') {
        if ( this._listado[id] ) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray ( tareas= []) {
        tareas.forEach ( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    listadoCompletoTareas () {
        // listar las tareas para mostrarlas ordenadas.
        console.log ()
        this.listadoArr.forEach ( (tarea, ind) => {
            let colInd = ind + 1
            let estadoTarea = (tarea.completadoEn === null) ? 
                    'Pendiente'.red : 
                    'Completada'.blue
            console.log (`${ colInd.toString().blue }. ${ tarea.descripcion } :: ${ estadoTarea }`)
        } )
    }

    listarTareasPendientesCompletadas ( completadas = true) {
        console.log ()
        let i = 1
        
        this.listadoArr.forEach ( (tarea) => {
            let estadoTarea = (tarea.completadoEn === null) ? 
                    'Pendiente'.red : 
                    tarea.completadoEn.blue

            if ( completadas ) {
                if ( tarea.completadoEn ) {  // tarea completa
                    console.log (`${ i.toString().blue }. ${ tarea.descripcion } :: ${ estadoTarea }`)
                    i++
                }
            } else {
                if ( !tarea.completadoEn ) {  // tarea completa
                    console.log (`${ i.toString().blue }. ${ tarea.descripcion } :: ${ estadoTarea }`)
                    i++
                }
            }
        } )
        console.log ()
    }

    toggleCompletadas ( ids = []) {
        ids.forEach ( id => {
            const tarea = this._listado[id]
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        // Para los ids que no vienen en el arreglo de ids se debe modificar el completado.
        this.listadoArr.forEach ( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null
            }
        })

    }

    crearTarea( desc = '') {
        const tarea = new Tarea ( desc )
        this._listado[tarea.id] = tarea
    }


}

module.exports = Tareas