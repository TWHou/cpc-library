import api from '../utils/api';

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const RECEIVE_BOOK = 'RECEIVE_BOOK';
export const CHECKOUT_BOOK = 'CHECkOUT_BOOK';
export const RENEW_BOOK = 'RENEW_BOOK';
export const RETURN_BOOK = 'RETURN_BOOK';
export const ADD_BOOK = 'ADD_BOOK';

const receiveBooks = (books) => ({
  type: RECEIVE_BOOKS,
  books
});

export const getBooksAPI = () => (dispatch) => {
  api.getBooks().then(
    (books) => dispatch(receiveBooks(books))
  );
};

const receiveBook = (book) => ({
  type: RECEIVE_BOOK,
  book
});

export const getBookAPI = (id) => (dispatch) => {
  api.getBook(id).then(
    (book) => dispatch(receiveBook(book))
  );
};

const checkout = (book) => ({
  type: CHECKOUT_BOOK,
  book
});

export const checkoutAPI = (id, info) => (dispatch) => {
  api.checkout(id, info).then(
    (book) => dispatch(checkout(book))
  );
};

const renew = (book) => ({
  type: RENEW_BOOK,
  book
});

export const renewAPI = (id) => (dispatch) => {
  api.renew(id).then(
    (book) => dispatch(renew(book))
  );
};

const returnBook = (book) => ({
  type: RETURN_BOOK,
  book
});

export const returnAPI = (id) => (dispatch) => {
  api.return(id).then(
    (book) => dispatch(returnBook(book))
  );
};

const addBook = (book) => ({
  type: ADD_BOOK,
  book
});

export const addBookAPI = (book) => (dispatch) => {
  api.addBook(book).then(
    (book) => dispatch(addBook(book))
  );
};