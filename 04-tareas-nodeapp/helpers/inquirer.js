const inquirer = require('inquirer')
require('colors')

const pausaProg = [
    {
        type: 'input',
        name: 'optpausa',
        message: `Presione ${ 'ENTER'.bgBlue } para continuar`,
    }
]

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1. '.blue } Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.blue }  Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.blue }  Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.blue }  Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.blue }  Completar tarea (s)`
            },
            {
                value: '6',
                name: `${'6.'.blue }  Borrar tarea`
            },
            {
                value: '0',
                name: `${'0. '.blue } Salir`
            },
        ]
    }
]

const inquireMenu = async () => {
        console.clear()
        console.log ('================================'.bgBlue)
        console.log ('   Seleccione una Opción'.white)
        console.log ('================================'.bgBlue)
        const { opcion } = await inquirer.prompt(preguntas)
        return opcion
}

const pausa = async () => {
    const optPausa = await inquirer.prompt(pausaProg)
    console.log ('\n')
    return optPausa
}

const leerInput = async ( message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
            if ( value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async (tareas = []) => {
    console.log ()
    const choices = tareas.map ( (tarea, i) => {
        const idx = `${i + 1}.`.blue
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value: '0',
        name:  '0. '.blue + 'Cancelar'
    })

    const preguntasBorrar = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar Tarea.',
            choices
        }
    ]

    const { id } = await inquirer.prompt ( preguntasBorrar )
    return id
}

const confirmarAccion = async ( message ) => {
    const preguntaConfirmar = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt ( preguntaConfirmar )
    return ok
}

const listadoTareasCheckList = async (tareas = []) => {
    console.log ()
    const choices = tareas.map ( (tarea, i) => {
        const idx = `${i + 1}.`.blue
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const preguntasCheck = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione.',
            choices
        }
    ]

    const { ids } = await inquirer.prompt ( preguntasCheck )
    return ids
}

module.exports = {  
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    listadoTareasCheckList
}