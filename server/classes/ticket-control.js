const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }

}


class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.anserweredTickets = [];
        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.anserweredTickets = data.anserweredTickets;
        } else {
            this.restart();
        }
    }

    restart() {
        console.log('restart');
        this.last = 0;
        this.tickets = [];
        this.saveFile();
    }

    next() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    answerTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'Sin tickets';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let answerTicket = new Ticket(ticketNumber, desktop);
        this.anserweredTickets.unshift(answerTicket);

        if (this.anserweredTickets.length > 4) {
            this.anserweredTickets.splice(-1, 1);
        }
        console.log('Ultimos 4: ', this.anserweredTickets);
        this.saveFile();

        return answerTicket;
    }

    getAnserweredTickets() {
        return this.anserweredTickets;
    }
    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            anserweredTickets: this.anserweredTickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}