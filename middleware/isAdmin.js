const isAdmin = (req, res, next) => {
    if (req.session.user.email === "admin@gmail.com") {
        next();
    } else {
        res.send("Access Denied!")
    }
};

module.exports = isAdmin;