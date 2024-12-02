const Show = require('../models/Show');
const Movie = require('../models/Movie');
const Ticket = require('../models/Ticket')
const Booking = require('../models/Booking')

exports.getAllShows = async (req, res) => {
    try {
        const id = req.params.id
        const movies = await Movie.getById(id);
        res.render('shows/createShows', { movies, id });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shows' });
    }
};

exports.createShow = async (req, res) => {
    try {
        const newShow = await Show.create(req.body);
        res.status(201).redirect(`/movies`);
    } catch (error) {
        res.status(500).json({ message: 'Error creating show' });
    }

};

exports.deleteShow = async (req, res) => {
    try {
        const tickets = await Ticket.getAll(req.params.id);

        if (tickets) {
            for (const ticket of tickets) {
                await Booking.delete(ticket.ticket_no);
                await Ticket.delete(ticket.ticket_no);
            }
        }

        const show = await Show.getById(req.params.id);
        await Show.delete(req.params.id);

        res.redirect(`/shows/delete/${show.m_id}`);
    } catch (e) {
        res.send(e);
    }
};

exports.getShows = async (req, res) => {
    try {
        const shows = await Show.getAll(req.params.id)
        const movie = await Movie.getById(req.params.id)
        res.render("shows/deleteShows", { shows, movie })
    }
    catch (e) {
        res.send("could not fetch")
    }
}

exports.getShowById = async (req, res) => {
    try {
        const show = await Show.getById(req.params.id)
        const movie = await Movie.getById(show.m_id)
        res.render('shows/editShows', { show, movie })
    }
    catch (e) {
        res.send("Cant get show");
    }
}

exports.updateShow = async (req, res) => {
    try {
        await Show.update(req.body, req.params.id)
        const show = await Show.getById(req.params.id)
        res.redirect(`/shows/delete/${show.m_id}`)
    }
    catch (e) {

    }
}