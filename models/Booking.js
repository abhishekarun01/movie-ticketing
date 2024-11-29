const db = require('../config/db');

const Booking = {
    getAll: async () => {
        const [bookings] = await db.query('SELECT * FROM Booking');
        return bookings;
    },

    getById: async (id) => {
        const [booking] = await db.query('SELECT * FROM Booking WHERE booking_id = ?', [id]);
        return booking[0];
    },

    create: async (data, ticket_no) => {
        const { u_id } = data;
        const result = await db.query('INSERT INTO Booking (u_id, ticket_no) VALUES (?, ?)', [u_id, ticket_no]);
        return result[0];
    },

    update: async (id, data) => {
        const { u_id, ticket_no, booking_date } = data;
        const result = await db.query('UPDATE Booking SET u_id = ?, ticket_no = ?, booking_date = ? WHERE booking_id = ?', [u_id, ticket_no, booking_date, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Booking WHERE booking_id = ?', [id]);
        return result[0];
    }
};

module.exports = Booking;
