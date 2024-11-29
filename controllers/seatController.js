const Seat = require('../models/Seat');

exports.getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.getAll();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving seats' });
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const seat = await Seat.getById(req.params.id);
        res.json(seat);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving seat' });
    }
};

exports.createSeat = async (req, res) => {
    try {
        const newSeat = await Seat.create(req.body);
        res.status(201).json(newSeat);
    } catch (error) {
        res.status(500).json({ message: 'Error creating seat' });
    }
};

exports.updateSeat = async (req, res) => {
    try {
        const updatedSeat = await Seat.update(req.params.id, req.body);
        res.json(updatedSeat);
    } catch (error) {
        res.status(500).json({ message: 'Error updating seat' });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        await Seat.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting seat' });
    }
};
