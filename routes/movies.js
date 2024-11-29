const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.get('/:id/edit', movieController.movieEditDisplay)
router.delete('/:id', movieController.deleteMovie);
router.get('/bookMovie/:id', movieController.bookingPage);

module.exports = router;
