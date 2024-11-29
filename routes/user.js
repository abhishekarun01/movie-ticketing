const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.get('/login', userController.displayLogin);
router.get('/register', userController.displayRegister);
router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);
router.post('/logout', userController.logoutUser);
router.get('/my-bookings', isAuthenticated, userController.getBookings)


module.exports = router;
