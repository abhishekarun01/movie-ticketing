const db = require('../config/db');

const Show = {
    getAll: async (id) => {
        const [shows] = await db.query('SELECT * FROM Shows WHERE m_id = ?', [id]);
        return shows;
    },

    create: async (data) => {
        const { st_time, end_time, m_id } = data;
        const result = await db.query('INSERT INTO Shows (st_time, end_time, m_id) VALUES (?, ?, ?)', [st_time, end_time, m_id]);
        return result[0];
    },
};

module.exports = Show;
