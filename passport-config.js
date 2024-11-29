const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')
const User = require('./models/User');


const authenticateUser = async (email, password, next) => {
    const user = User.getUser(email)
    if (user.length === 0) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }
    try {
        if (await bcrypt.compare(password, hashPassword))
            return next(null, user)
        else {
            return next(null, false, { message: "Invalid email or password" })
        }
    }
    catch (e) {
        return next(e)
    }
}

const initialize = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, next) => { })
    passport.deserializeUser((id, next) => { })
}

module.exports = initialize