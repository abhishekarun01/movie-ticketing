const express = require('express');
const movieController = require('../controllers/movieController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin')


const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', isAuthenticated, movieController.getMovieById);
router.post('/', isAdmin, movieController.createMovie);
router.put('/:id', isAdmin, movieController.updateMovie);
router.get('/:id/edit', isAdmin, movieController.movieEditDisplay)
router.post('/delete', isAdmin, movieController.deleteMovie);
router.get('/bookMovie/:id', isAuthenticated, movieController.bookingPage);

module.exports = router;
