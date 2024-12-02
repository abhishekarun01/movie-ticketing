const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket')
const Show = require('../models/Show')
const db = require('../config/db')

exports.createBooking = async (req, res) => {
    try {
        const show = await Show.getById(req.body.show_id)
        const total_seats = show.total_seats - req.body.seat_no
        if (total_seats >= 0) {
            await Show.updateSeats(total_seats, req.body.show_id)
            const ticket_number = await Ticket.create(req.body)
            const { ticket_no } = ticket_number[0]
            const newBooking = await Booking.create(req.body, ticket_no);
            res.redirect('/my-bookings')
        }
        else {
            req.flash('error', `There are only ${show.total_seats} available for this show`)
            res.redirect(`/movies/bookMovie/${show.m_id}`)
        }
    } catch (error) {
        res.send(error);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { ticket_no, show_id, seat_no } = req.body
        await Booking.delete(ticket_no);
        await Ticket.delete(ticket_no);
        const show = await Show.getById(show_id)
        const total_seats = show.total_seats + parseInt(seat_no);
        await Show.updateSeats(total_seats, show_id)
        if (req.session.user.email === "admin@gmail.com") {
            return res.redirect('/all-bookings')
        }
        res.redirect('/my-bookings');
    } catch (error) {
        res.send(error);
    }
};
