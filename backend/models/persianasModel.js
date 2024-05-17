const mongoose = require('mongoose');

const persianaSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    message: {
        type: String,
        required: [true, "Please enter your message"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Persiana', persianaSchema);
