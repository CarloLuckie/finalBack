const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config(); // Ensure dotenv is required here
const cors = require('cors');

// Connect to the database
connectDB();

const port = process.env.PORT || 8000;
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON and x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Main API route for persianas
app.use('/api/persianas', require('./routes/persianasRoutes'));
app.use('/api/users', require('./routes/authRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`.yellow));
