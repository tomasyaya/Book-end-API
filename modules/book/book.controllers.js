const Book = require("./Book.model");
const mongoose = require("mongoose");
const { render } = require("express/lib/response");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getBooks(req, res) {
  try {
    const Books = await Book.find().populate("tasks").lean();
    res.status(200).json(Books).end();
    res.render("/books")
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function getBookById(req, res) {
  try {
    const { BookId } = req.params;
    if (!isObjectId(BookId)) {
      res.status(400).json("Id not valid").end();
    }
    const Book = await Book.findById(BookId).populate("tasks").lean();
    res.status(200).json(Book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function createBook(req, res) {
  try {
    const Book = await Book.create(req.body);
    res.status(200).json(Book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
    console.log(err)
  }
}

async function updateBook(req, res) {
  try {
    const { BookId } = req.params;
    if (!isObjectId(BookId)) {
      res.status(400).json("Id not valid").end();
    }
    const Book = await Book.findByIdAndUpdate(BookId, req.body, {
      new: true,
    }).lean();

    res.status(200).json(Book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function deleteBook(req, res) {
  try {
    const { BookId } = req.params;
    if (!isObjectId(BookId)) {
      res.status(400).json("Id not valid").end();
    }
    const Book = await Book.findByIdAndDelete(BookId).lean();
    res.status(200).json(Book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
  getBookById,
  getBooks,
  updateBook,
  createBook,
  deleteBook,
};
