const asyncHandler = require('express-async-handler');
const Persianas = require('../models/persianasModel');
const mongoose = require('mongoose');

const getPersianas = asyncHandler(async (req, res) => {
    const persianas = await Persianas.find();
    res.status(200).json(persianas);
});

const createPersiana = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please fill all required fields." });
    }

    try {
        const persiana = await Persianas.create({
            name,
            email,
            message
        });
        res.status(201).json(persiana);
    } catch (error) {
        console.error("Error creating persiana:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const updatePersiana = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid persiana ID." });
    }

    const persiana = await Persianas.findById(req.params.id);

    if (!persiana) {
        return res.status(404).json({ error: 'Persiana not found' });
    }

    const updatedPersiana = await Persianas.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPersiana);
});

const deletePersiana = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid persiana ID." });
    }

    const persiana = await Persianas.findById(req.params.id);

    if (!persiana) {
        return res.status(404).json({ error: 'Persiana not found' });
    }

    await persiana.deleteOne();
    res.status(200).json({ message: `Persiana deleted: ${req.params.id}` });
});

module.exports = {
    getPersianas,
    createPersiana,
    updatePersiana,
    deletePersiana
};
