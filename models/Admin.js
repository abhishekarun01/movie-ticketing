const db = require('../config/db');

const Admin = {
    getAll: async () => {
        const [admins] = await db.query('SELECT * FROM Admin');
        return admins;
    },

    getById: async (id) => {
        const [admin] = await db.query('SELECT * FROM Admin WHERE admin_id = ?', [id]);
        return admin[0];
    },

    create: async (data) => {
        const { password } = data;
        const result = await db.query('INSERT INTO Admin (password) VALUES (?)', [password]);
        return result[0];
    },

    update: async (id, data) => {
        const { password } = data;
        const result = await db.query('UPDATE Admin SET password = ? WHERE admin_id = ?', [password, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Admin WHERE admin_id = ?', [id]);
        return result[0];
    }
};

module.exports = Admin;
