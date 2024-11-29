const Show = require('../models/Show');
const Movie = require('../models/Movie');

exports.getAllShows = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.render('shows/createShows', { movies });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shows' });
    }
};

exports.createShow = async (req, res) => {
    try {
        console.log(req.body);
        const newShow = await Show.create(req.body);
        res.status(201).redirect('/shows');
    } catch (error) {
        res.status(500).json({ message: 'Error creating show' });
    }
};
