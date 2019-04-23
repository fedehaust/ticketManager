var socket = io();
var label = $('#desktop');
var small = $('small');


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Se requiere el escritorio');
}

var desktop = searchParams.get('escritorio');
label.text(desktop);
console.log(desktop);

$('button').on('click', () => {
    socket.emit('answerTicket', { desktop: desktop }, function(message) {

        if (message === 'Sin tickets') {
            small.text('Sin tickets');
            return
        }

        small.text(message.number);
    });
})