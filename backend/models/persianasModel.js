const mongoose = require('mongoose');

const persianaSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingrese su nombre"]
    },
    email: {
        type: String,
        required: [true, "Ingrese su correo"]
    },
    message: {
        type: String,
        required: [true, "Ingrese el mensaje"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Persiana', persianaSchema);
