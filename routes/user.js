const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')

const router = express.Router();

router.get('/login', isLoggedIn, userController.displayLogin);
router.get('/register', isLoggedIn, userController.displayRegister);
router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);
router.get('/logout', userController.logoutUser);
router.get('/my-bookings', isAuthenticated, userController.getBookings)
router.get('/all-bookings', isAdmin, userController.getAllBookings)


module.exports = router;
