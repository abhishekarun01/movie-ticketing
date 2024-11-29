const express = require('express');
const theatreController = require('../controllers/theatreController');

const router = express.Router();

router.get('/', theatreController.getAllTheatres);
router.get('/:id', theatreController.getTheatreById);
router.post('/', theatreController.createTheatre);
router.put('/:id', theatreController.updateTheatre);
router.delete('/:id', theatreController.deleteTheatre);

module.exports = router;
