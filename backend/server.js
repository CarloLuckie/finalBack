const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config(); 
const cors = require('cors');

// Conectar a la base de datos
connectDB();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/persianas', require('./routes/persianasRoutes'));
app.use('/api/users', require('./routes/authRoutes'));


app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`.yellow));
