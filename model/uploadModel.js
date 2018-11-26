const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: String, required: true }
});

module.exports = mongoose.model('file', fileSchema);