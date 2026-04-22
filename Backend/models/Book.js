const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    category: String
});
module.exports = mongoose.model('Book', BookSchema);
