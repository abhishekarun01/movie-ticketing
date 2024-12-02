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
        await User.create(req.body);
        await req.flash('success', "Registered successfully");
        return res.redirect('/login')
    }
    catch (e) {
        await req.flash('error', "Email has already been registered")
        return res.redirect("/register")
    }
};

exports.loginUser = async (req, res) => {
    const { email_id, password } = req.body;
    try {
        const user = await User.getUser(req.body)
        if (user.length === 0) {
            req.flash('error', "Invalid email or password")
            return res.redirect("/login")
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            req.flash('error', "Invalid email or password")
            return res.redirect("/login")
        }

        req.session.user = {
            id: user[0].u_id,
            name: user[0].u_name,
            email: user[0].email_id
        }

    } catch (error) {
        req.flash('error', "Error logging in, try again!")
        return res.redirect("/login")
    }

    req.flash('success', 'Logged In Successfully!')
    // setTimeout(() => {
    //     return res.redirect('/movies');
    // }, 1000);
    res.redirect('/movies/');
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/login');
    })
}

exports.getBookings = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const bookedMovies = await db.query(`SELECT b.u_id, b.ticket_no, s.st_time, s.end_time, s.show_id, t.seat_no, m.m_name, m.ImageURL FROM 
                booking AS b JOIN Tickets AS t ON b.ticket_no = t.ticket_no JOIN  Shows AS s ON  t.show_id = s.show_id 
                JOIN  Movie AS m ON  s.m_id = m.m_id WHERE b.u_id = ?;`, [userId])
        if (bookedMovies[0].length === 0) {
            req.flash('error', "You have not booked any shows yet")
            res.redirect('/movies')
        }
        else {
            res.render('users/displayBookings', { bookedMovies });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const allBookings = await db.query('SELECT u.u_name, u.email_id, b.ticket_no, t.seat_no, s.show_id, m.m_name, s.st_time, s.end_time FROM User u JOIN Booking b ON u.u_id = b.u_id JOIN Tickets t ON b.ticket_no = t.ticket_no JOIN Shows s ON t.show_id = s.show_id JOIN Movie m ON s.m_id = m.m_id ORDER BY t.ticket_no;')
        if (allBookings[0].length === 0) {
            req.flash('error', "No one has booked a ticket yet")
            res.redirect('/movies')
        }
        res.render('users/displayAllBookings', { allBookings })
    }
    catch (e) {
        req.flash('error', e.message)
    }
}