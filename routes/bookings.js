const express = require('express');
const bookingController = require('../controllers/bookingController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/my-bookings', isAuthenticated, bookingController.createBooking)
router.post('/delete', isAuthenticated, bookingController.deleteBooking)

module.exports = router;
