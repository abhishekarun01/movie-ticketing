const Theatre = require('../models/Theatre');

exports.getAllTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.getAll();
        res.json(theatres);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving theatres' });
    }
};

exports.getTheatreById = async (req, res) => {
    try {
        const theatre = await Theatre.getById(req.params.id);
        res.json(theatre);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving theatre' });
    }
};

exports.createTheatre = async (req, res) => {
    try {
        const newTheatre = await Theatre.create(req.body);
        res.status(201).json(newTheatre);
    } catch (error) {
        res.status(500).json({ message: 'Error creating theatre' });
    }
};

exports.updateTheatre = async (req, res) => {
    try {
        const updatedTheatre = await Theatre.update(req.params.id, req.body);
        res.json(updatedTheatre);
    } catch (error) {
        res.status(500).json({ message: 'Error updating theatre' });
    }
};

exports.deleteTheatre = async (req, res) => {
    try {
        await Theatre.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting theatre' });
    }
};
