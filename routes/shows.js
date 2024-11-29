const express = require('express');
const showController = require('../controllers/showController');

const router = express.Router();

router.get('/', showController.getAllShows);
router.post('/', showController.createShow);

module.exports = router;
