const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, minlength: 5 },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
