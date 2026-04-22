const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

exports.addBook = async (req, res) => {
    const b = new Book(req.body);
    await b.save();
    res.send("Added");
};

exports.updateBook = async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
};

exports.deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Deleted");
};

exports.getBookById = async (req, res) => {
    const b = await Book.findById(req.params.id);
    res.json(b);
};
