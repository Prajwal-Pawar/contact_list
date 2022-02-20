// import mongoose
const mongoose = require('mongoose');

// define schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// give name to a collection
const Contact = mongoose.model('Contact', contactSchema);

// export module 
module.exports = Contact;