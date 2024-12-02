const db = require('../config/db');

const Ticket = {
    getAll: async (id) => {
        const [tickets] = await db.query('SELECT * FROM Tickets WHERE show_id = ?', [id]);
        return tickets;
    },

    getById: async (id) => {
        const [ticket] = await db.query('SELECT * FROM Tickets WHERE ticket_no = ?', [id]);
        return ticket[0];
    },

    create: async (data) => {
        const { show_id, seat_no } = data;
        const result = await db.query('INSERT INTO Tickets (show_id, seat_no) VALUES (?, ?)', [show_id, seat_no]);
        const ticket_number = await db.query('SELECT ticket_no from Tickets ORDER BY ticket_no DESC LIMIT 1');
        return ticket_number[0];
    },

    update: async (id, data) => {
        const { show_id, t_id, seat_no, price, admin_id } = data;
        const result = await db.query('UPDATE Tickets SET show_id = ?, t_id = ?, seat_no = ?, price = ?, admin_id = ? WHERE ticket_no = ?', [show_id, t_id, seat_no, price, admin_id, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Tickets WHERE ticket_no = ?', [id]);
        return result[0];
    }
};

module.exports = Ticket;
