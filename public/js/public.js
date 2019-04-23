var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblEscritorio1');
var lblDesktop2 = $('#lblEscritorio2');
var lblDesktop3 = $('#lblEscritorio3');
var lblDesktop4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('currentStatus', (data) => {
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    updateHtml(data);
});


function updateHtml(data) {
    for (var i = 0; i < 4; i++) {
        lblDesktops[i].text('Escritorio ' + data.anserweredTickets[i].desktop);
        lblTickets[i].text('Ticket ' + data.anserweredTickets[i].number);
    }
}