const mongoose = require('mongoose');

const siteLogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    entryDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('siteLog', siteLogSchema);