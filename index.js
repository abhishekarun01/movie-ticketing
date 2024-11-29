const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')
const MySQLStore = require('express-mysql-session')(session)


const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
    name: 'session',
    secret: 'qwerty123',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Import routes
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/bookings');
const movieRoutes = require('./routes/movies');
const seatRoutes = require('./routes/seats');
const showRoutes = require('./routes/shows');
const theatreRoutes = require('./routes/theatres');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/user');
const newMovieRoutes = require('./routes/newMovie')

// Use routes
app.use('/admin', adminRoutes);
app.use('/bookings', bookingRoutes);
app.use('/movies', movieRoutes);
app.use('/seats', seatRoutes);
app.use('/shows', showRoutes);
app.use('/theatres', theatreRoutes);
app.use('/tickets', ticketRoutes);
app.use('/', userRoutes);
app.use('/newMovie', newMovieRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
