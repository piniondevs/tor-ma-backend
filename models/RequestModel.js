const mongoose = require('mongoose');

const requestModel = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    gali: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Request = mongoose.model('request', requestModel);

module.exports = Request;