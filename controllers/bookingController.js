const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket')
const db = require('../config/db')

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.getById(req.params.id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const ticket_number = await Ticket.create(req.body)
        const { ticket_no } = ticket_number[0]
        const newBooking = await Booking.create(req.body, ticket_no);
        res.redirect('/my-bookings')
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.update(req.params.id, req.body);
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
};
