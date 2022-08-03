/**
 * Modelo para almacenar los usuarios que están conectados.
 * No se guardan en ninguna base de datos. Se guarda en un JSON
 */

class Mensaje {
    constructor (uid, nombre, mensaje) {
        this.uid       = uid
        this.nombre    = nombre
        this.mensaje   = mensaje
    }
}

class ChatMensajes {
    constructor () {
        this.mensajes = []
        this.usuarios = {}
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10)
        return this.mensajes
    }

    get usuariosArr() {
        return Object.values( this.usuarios ) // [ {}, {}, {} ...]
    }

    enviarMensaje ( uid, nombre, mensaje) {
        this.mensajes.unshift ( 
            new Mensaje ( uid, nombre, mensaje)
        )
    }

    conectarUsuario ( usuario ) {
        // Le colocamos como identificador a la llave del objeto el usuario.uid
        this.usuarios[usuario.id] = usuario
    }

    desconectarUsuario ( id ) {
        // borramos el identificador del usuario
        delete this.usuarios[id]
    }

}

module.exports = ChatMensajes

