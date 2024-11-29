const Movie = require('../models/Movie');
const Shows = require('../models/Show');

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
        console.log(movies)
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
        return res.status(201).redirect(`/movies/`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.update(req.params.id, req.body);
        res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie' });
    }
};

exports.deleteMovie = async (req, res) => {
    console.log(req.params.id)
    try {
        await Movie.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie' });
    }
};

exports.bookingPage = async (req, res) => {
    try {
        const movie = await Movie.getById(req.params.id);
        const shows = await Shows.getAll(req.params.id)
        console.log(shows)
        if (movie) {
            res.render('movies/bookingPage', { movie, shows });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie' });
    }
}
