var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('desconectado al servidor');
});

socket.on('currentStatus', (status) => {
    label.text(status.currentStatus);
    console.log(status);
});

$('button').on('click', () => {
    socket.emit('nextTicket', null, function(message) {
        label.text(message);
    });
})