const db = require('../config/db');

const Theatre = {
    getAll: async () => {
        const [theatres] = await db.query('SELECT * FROM Theatre');
        return theatres;
    },

    getById: async (id) => {
        const [theatre] = await db.query('SELECT * FROM Theatre WHERE t_id = ?', [id]);
        return theatre[0];
    },

    create: async (data) => {
        const { tname, location } = data;
        const result = await db.query('INSERT INTO Theatre (tname, location) VALUES (?, ?)', [tname, location]);
        return result[0];
    },

    update: async (id, data) => {
        const { tname, location } = data;
        const result = await db.query('UPDATE Theatre SET tname = ?, location = ? WHERE t_id = ?', [tname, location, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Theatre WHERE t_id = ?', [id]);
        return result[0];
    }
};

module.exports = Theatre;
