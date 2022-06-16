
// Referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender    = document.querySelector('button')
const lblTicket     = document.querySelector('small')
const divAlerta     = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

// Asignar a esa variable los parámetros que vienen por URL
const searchParams = new URLSearchParams ( window.location.search )

if ( !searchParams.has ('escritorio')) {
    window.location = 'index.html'
    throw new Error ('El Escritorio es obligatorio..')
}

// Para saber en qué escritorio se está

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false
});

socket.on('disconnect', () => {
    btnAtender.disabled = true
});

// Para traer el último ticket y mostrarlo cuando se carga el navegador
socket.on ('tickets-pendientes', ( ticketsPendientes ) => {
    if ( ticketsPendientes === 0 ) {
    } else {
        lblPendientes.style.display = ''
    }
    lblPendientes.innerText = ticketsPendientes
})


// Para traer el último ticket y mostrarlo cuando se carga el navegador
socket.on ('ultimo-ticket', ( ultimo ) => {
    // lblNuevoTicket.innerText = 'Ticket ' + ultimo
})

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio },( { ok, ticket, msg } ) => {
        if ( !ok ) {
            lblTicket.innerText = `Nadie!`
            return divAlerta.style.display = ''
        }

        // Hay un ticket
        lblTicket.innerText = `Ticket  ${ ticket.numero }`
    })
});