// Referencias html
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
// Referencia al primer botón que encuentre
const btnCrear = document.querySelector('button') 

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false
});

socket.on('disconnect', () => {
    btnCrear.disabled = true
});

// Para traer el último ticket y mostrarlo cuando se carga el navegador
socket.on ('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo
})

btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});