const Movie = require('../models/Movie');
const Shows = require('../models/Show');
const Tickets = require('../models/Ticket')
const Bookings = require('../models/Booking')

exports.newMovieDisplay = (req, res) => {
    res.render("movies/newMovie")
}

exports.movieEditDisplay = async (req, res) => {
    const movie = await Movie.getById(req.params.id)
    res.render("movies/editMovie", { movie })
}

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.render('movies/displayMovies', { movies });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies' });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.getById(req.params.id);
        const shows = await Shows.getAll(req.params.id);
        if (movie) {
            res.render('movies/bookMovies', { movie, shows });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie' });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        req.flash('success', "Created new movie")
        return res.redirect(`/movies/`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        await Movie.update(req.params.id, req.body);
        res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie' });
    }
};

exports.deleteMovie = async (req, res) => {
    const { m_id } = req.body;

    try {
        const shows = await Shows.getAll(m_id);
        if (shows) {
            for (const show of shows) {
                const tickets = await Tickets.getAll(show.show_id);

                if (tickets.length >= 1) {
                    for (const ticket of tickets) {
                        await Bookings.delete(ticket.ticket_no);
                        await Tickets.delete(ticket.ticket_no);
                    }
                }

                await Shows.delete(show.show_id);
            }
        }

        await Movie.delete(m_id);
        res.redirect('/movies');
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.bookingPage = async (req, res) => {
    try {
        const movie = await Movie.getById(req.params.id);
        const shows = await Shows.getAll(req.params.id)
        if (movie) {
            res.render('movies/bookingPage', { movie, shows });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie' });
    }
}
