const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registar nuevo usuario
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Checar si el usuario exsite
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
    }

    // Crear el usuario
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }
});

// Autenticar
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Checar el correo del usuario
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ error: "Invalid email or password" });
    }
});

// Generar JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = {
    registerUser,
    loginUser
};
