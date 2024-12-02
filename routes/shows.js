const express = require('express');
const showController = require('../controllers/showController');
const isAdmin = require('../middleware/isAdmin')

const router = express.Router();

router.get('/:id', isAdmin, showController.getAllShows);
router.post('/', isAdmin, showController.createShow);
router.post('/delete/:id', isAdmin, showController.deleteShow);
router.get('/delete/:id', isAdmin, showController.getShows);
router.get('/edit/:id', isAdmin, showController.getShowById);
router.put('/edit/:id', isAdmin, showController.updateShow);

module.exports = router;
