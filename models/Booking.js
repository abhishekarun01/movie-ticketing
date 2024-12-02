const db = require('../config/db');

const Booking = {
    create: async (data, ticket_no) => {
        const { u_id } = data;
        const result = await db.query('INSERT INTO Booking (u_id, ticket_no) VALUES (?, ?)', [u_id, ticket_no]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Booking WHERE ticket_no = ?', [id]);
        return result[0];
    }
};

module.exports = Booking;
