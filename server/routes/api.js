const router = require('express').Router();
const axios = require('axios');

const Book = require('../models/Book');
const Verify = require('./verify');


const getBooks = (req, res, next) => {
  Book.find({})
    .exec((err, books) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(books);
    });
};

const getBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return next(err);
      }
      if (book.id) {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${book.id}`)
          .then((resp) => {
            const { title, author, category, _id, id, renewed, onShelf, dueDate, name, email, staff } = book;
            const image = resp.data.volumeInfo.imageLinks.thumbnail;
            const description = resp.data.volumeInfo.description;
            const curBook = {
              title, author, category, _id, id, renewed, onShelf, image, description, dueDate, name, email, staff
            };
            res.status(200).send(curBook);
          }).catch((err) => next(err));
      } else {
        res.status(200).send(book);
      }
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
        book.dueDate = new Date();
        book.dueDate.setDate(book.dueDate.getDate() + 21);
      } else {
        book.renewed++;
        book.dueDate.setDate(book.dueDate.getDate() + 21);
        if (book.renewed > 3) {
          return next('renewed too many times');
        }
      }
      // book.staff = req.payload._id;
      book.save((err, book) => {
        if (err) {
          return next(err);
        }
        res.status(200).send(book);
      });
    });
};

const returnBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .exec((err, book) => {
      if (err) {
        return next(err);
      }
      book.name = undefined;
      book.email = undefined;
      book.borrowed = undefined;
      book.dueDate = undefined;
      book.staff = undefined;
      book.renewed = 0;
      book.onShelf = true;
      book.save((err, book) => {
        if (err) {
          return next(err);
        }
        console.log(book);
        res.status(200).send(book);
      });
    });
};

const search = (req, res, next) => {
  const query = req.params.query;
  const key = process.env.BOOKS_API;
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}`)
    .then((resp) => {
      res.status(200).send(resp.data.items);
    })
    .catch((err) => next(err));
};

const addBook = (req, res, next) => {
  const { title, author, category, id } = req.body;
  const book = new Book({
    title,
    author,
    category,
    id
  });

  book.save((err, book) => {
    if (err) {
      return next(err);
    }
    res.status(200).send(book);
  });
};

router.get('/', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

router.get('/books', getBooks);
router.get('/books/:bookId', getBook);
router.get('/search/:query', search);
router.post('/checkout/:bookId', checkout);
router.post('/return/:bookId', returnBook);
router.post('/add', addBook);

module.exports = router;