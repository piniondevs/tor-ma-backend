const mongoose = require('mongoose');

const galiModel = new mongoose.Schema({
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

const Gali = mongoose.model('gali', galiModel);

module.exports = Gali;