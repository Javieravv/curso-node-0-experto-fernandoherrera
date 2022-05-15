/**Aquí van los mensajes. */
require ('colors')

const mostrarMenu = () => {

    return new Promise ( resolve => {
        console.clear()
        console.log ('================================'.blue)
        console.log ('   Seleccione una Opción'.yellow)
        console.log ('================================'.blue)
    
        console.log (`${ ' 1.'.blue } Crear tarea`)
        console.log (`${ ' 2.'.blue } Listar tareas`)
        console.log (`${ ' 3.'.blue } Listar tareas completadas`)
        console.log (`${ ' 4.'.blue } Listar Tareas pendientes`)
        console.log (`${ ' 5.'.blue } Completar tarea (s)`)
        console.log (`${ ' 6.'.blue } Borrar tarea`)
        console.log (`${ ' 0.'.blue } Salir\n`)
    
        // Preparar interfaz del usuario
        const readline = require('readline').createInterface ({
            input: process.stdin,
            ouput: process.stdout
        });
    
        readline.question('Seleccione una opción:'.green, (opt) => {
            readline.close()
            resolve ( opt )
        })
    })

}

const pausa = () => {
    return new Promise ( resolve => {
        const readline = require('readline').createInterface ({
            input: process.stdin,
            ouput: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.blue } para continuar\n `, (opt) => {
            readline.close()
            resolve ( opt )
        });
    })
}

module.exports = { 
    mostrarMenu,
    pausa
}