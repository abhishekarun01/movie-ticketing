const Admin = require('../models/Admin');

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.getAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admins' });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.getById(req.params.id);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admin' });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin' });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.update(req.params.id, req.body);
        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin' });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin' });
    }
};
