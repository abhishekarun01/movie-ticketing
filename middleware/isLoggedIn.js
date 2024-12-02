const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/movies');
    } else {
        next();
    }
};

module.exports = isLoggedIn;