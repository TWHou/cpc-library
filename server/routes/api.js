const router = require('express').Router();

const Book = require('../models/Book');
const Verify = require('./verify');


const getBooks = (req, res, next) => {
  Book.find({})
    .exec((err, books) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({books});
    });
};

const getBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({book});
    });
};

const checkout = (req, res, next) => {
  Book.findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return next(err);
      }
      if (book.onShelf) {
        book.name = req.body.name;
        book.email = req.body.email;
        book.onShelf = false;
        book.borrowed = new Date();
        book.dueDate = book.borrowed;
        book.dueDate.setDate(book.dueDate.getDate() + 21);
      } else {
        book.renewed++;
        if (book.renewed > 3) {
          return next('renewed too many times');
        }
      }
      book.staff = req.payload._id;
      book.save((err, book) => {
        if (err) {
          return next(err);
        }
        res.status(200).send({book});
      });
    });
};

const returnBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return next(err);
      }
      delete book.name;
      delete book.email;
      delete book.borrowed;
      delete book.dueDate;
      delete book.staff;
      book.renewed = 0;
      book.onShelf = true;
      book.save((err, book) => {
        if (err) {
          return next(err);
        }
        res.status(200).send({book});
      });
    });
};

const addBook = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author
  });
  book.save((err, book) => {
    if (err) {
      return next(err);
    }
    res.status(200).send({book});
  });
};

router.get('/', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

router.get('/books', Verify.verifyUser, getBooks);
router.get('/book/:bookId', Verify.verifyUser, getBook);
router.post('/checkout/:bookId', Verify.verifyUser, checkout);
router.post('/return/:bookId', Verify.verifyUser, returnBook);
router.post('/add', Verify.verifyUser, addBook);

module.exports = router;