const db = require('../config/db');

const Seat = {
    getAll: async () => {
        const [seats] = await db.query('SELECT * FROM Seats');
        return seats;
    },

    getById: async (id) => {
        const [seat] = await db.query('SELECT * FROM Seats WHERE t_id = ?', [id]);
        return seat[0];
    },

    create: async (data) => {
        const { t_id, seat_name, no_of_seats } = data;
        const result = await db.query('INSERT INTO Seats (t_id, seat_name, no_of_seats) VALUES (?, ?, ?)', [t_id, seat_name, no_of_seats]);
        return result[0];
    },

    update: async (id, data) => {
        const { t_id, seat_name, no_of_seats } = data;
        const result = await db.query('UPDATE Seats SET t_id = ?, seat_name = ?, no_of_seats = ? WHERE seat_id = ?', [t_id, seat_name, no_of_seats, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Seats WHERE seat_id = ?', [id]);
        return result[0];
    }
};

module.exports = Seat;
