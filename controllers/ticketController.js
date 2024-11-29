const Ticket = require('../models/Ticket');

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.getAll();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tickets' });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.getById(req.params.id);
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket' });
    }
};

exports.createTicket = async (req, res) => {
    try {
        const newTicket = await Ticket.create(req.body);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket' });
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.update(req.params.id, req.body);
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket' });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        await Ticket.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket' });
    }
};
