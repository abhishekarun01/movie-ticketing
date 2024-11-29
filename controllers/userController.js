const User = require('../models/User');
const db = require('../config/db')
const bcrypt = require('bcrypt')


exports.displayLogin = (req, res) => {
    res.render("users/login")
};

exports.displayRegister = (req, res) => {
    res.render("users/register")
};

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await User.create(req.body);
        res.status(201);
    } catch (error) {
        res.status(500);
        console.log(error);
    }
    res.redirect('/login')
};

exports.loginUser = async (req, res) => {
    const { email_id, password } = req.body;
    try {
        const user = await User.getUser(req.body)
        console.log(user)
        if (user.length === 0) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.user = {
            id: user[0].u_id,
            name: user[0].u_name,
            email: user[0].email_id
        }

    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }

    res.redirect('/movies/');
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    })
}

exports.getBookings = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const bookedMovies = await db.query(`SELECT b.u_id, b.ticket_no, s.st_time, s.end_time, s.show_id, m.m_name FROM 
                booking AS b JOIN Tickets AS t ON b.ticket_no = t.ticket_no JOIN  Shows AS s ON  t.show_id = s.show_id 
                JOIN  Movie AS m ON  s.m_id = m.m_id WHERE b.u_id = ?;`, [userId])
        console.log(bookedMovies[0])
        res.render('users/displayBookings', { bookedMovies });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal Server Error');
    }
}