const express = require('express');
const bookingController = require('../controllers/bookingController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.get('/my-bookings', isAuthenticated,)
router.post('/my-bookings', bookingController.createBooking)

module.exports = router;
