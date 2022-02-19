const Book = require("./Book.model");
const mongoose = require("mongoose");
const { render } = require("express/lib/response");
const { default: axios } = require("axios");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getBooks(req, res) {
  try {
    const books = await Book.find().lean();
    res.status(200).json(books).end();
    //res.render("/books")
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function getBookById(req, res) {
  try {
    const { bookId } = req.params;
    if (!isObjectId(bookId)) {
      res.status(400).json("Id not valid").end();
    }
    const book = await Book.findById(bookId).populate("books").lean();
    res.status(200).json(book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
    console.log(err)
  }
}

async function updateBook(req, res) {
  try {
    const { tookId } = req.params;
    if (!isObjectId(bookId)) {
      res.status(400).json("Id not valid").end();
    }
    const book = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    }).lean();

    res.status(200).json(book).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function deleteBook(req, res) {
  try {
    const { bookId } = req.params;
    if (!isObjectId(bookId)) {
      res.status(400).json("Id not valid").end();
    }
    const book = await Book.findByIdAndDelete(bookId).lean();
    res.status(200).json(book).end();
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
