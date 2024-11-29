const db = require('../config/db');
const bcrypt = require("bcrypt");

const User = {
    create: async (data) => {
        const { u_name, email_id, password } = data;
        const hashPassword = await bcrypt.hash(password, 8);
        const result = await db.query('INSERT INTO User (u_name, email_id, password) VALUES (?, ?, ?)', [u_name, email_id, hashPassword]);
        return result[0];
    },

    getUser: async (data) => {
        const { email_id } = data;
        const result = await db.query('SELECT * FROM User WHERE email_id = ?', [email_id]);
        return result[0];
    },

    getBookings: async (data) => {
        const { userId } = data;
        const result = await db.query('SELECT * FROM Booking WHERE u_id = ?', [userId]);
        return result[0];
    }
};

module.exports = User;
