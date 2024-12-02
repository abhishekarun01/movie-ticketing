const express = require('express');
const movieController = require('../controllers/movieController');
const isAdmin = require('../middleware/isAdmin')

const router = express.Router();

router.get('/', isAdmin, movieController.newMovieDisplay);

module.exports = router;