const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        callback(ticketControl.next());
    });

    client.emit('currentStatus', {
        currentStatus: ticketControl.getLastTicket(),
        anserweredTickets: ticketControl.getAnserweredTickets()
    });

    client.on('answerTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                error: true,
                message: 'El escritorio es necesario'
            });
        }

        let answerTicket = ticketControl.answerTicket(data.desktop);

        callback(answerTicket);
        client.broadcast.emit('currentStatus', {
            currentStatus: ticketControl.getLastTicket(),
            anserweredTickets: ticketControl.getAnserweredTickets()
        });
    });
});