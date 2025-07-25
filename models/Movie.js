const db = require('../config/db');

const Movie = {
    getAll: async () => {
        const [movies] = await db.query('SELECT * FROM Movie');
        return movies;
    },

    getById: async (id) => {
        const [movie] = await db.query('SELECT * FROM Movie WHERE m_id = ?', [id]);
        return movie[0];
    },

    create: async (data) => {
        const { m_name, rating, ImageURL } = data;
        const result = await db.query('INSERT INTO Movie (m_name, rating, ImageURL) VALUES (?, ?, ?)', [m_name, rating, ImageURL]);
        console.log(result);
        return result[0];
    },

    update: async (id, data) => {
        const { m_name, rating, ImageURL } = data;
        const result = await db.query('UPDATE Movie SET m_name = ?, rating = ? , ImageURL = ? WHERE m_id = ?', [m_name, rating, ImageURL, id]);
        return result[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM Movie WHERE m_id = ?', [id]);
        return result[0];
    }
};

module.exports = Movie;
