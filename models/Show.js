const db = require('../config/db');

const Show = {
    getAll: async (id) => {
        const [shows] = await db.query('SELECT * FROM Shows WHERE m_id = ?', [id]);
        return shows;
    },

    getById: async (id) => {
        const [show] = await db.query('SELECT * FROM Shows WHERE show_id = ?', [id])
        return show[0];
    },

    create: async (data) => {
        const { st_time, end_time, m_id, total_seats } = data;
        const result = await db.query('INSERT INTO Shows (st_time, end_time, m_id, total_seats) VALUES (?, ?, ?, ?)', [st_time, end_time, m_id, total_seats]);
        return result[0];
    },

    update: async (data, id) => {
        const { st_time, end_time } = data
        const result = await db.query('UPDATE Shows SET st_time = ?, end_time = ? WHERE show_id = ?', [st_time, end_time, id])
    },

    updateSeats: async (data, id) => {
        const result = await db.query('UPDATE Shows SET total_seats = ? WHERE show_id = ?', [data, id])
    },

    delete: async (id) => {
        const result = await db.query("DELETE FROM Shows WHERE show_id = ?", [id])
        return result[0];
    }
};

module.exports = Show;
