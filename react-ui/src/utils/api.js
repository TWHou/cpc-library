import axios from 'axios';

const token = localStorage.getItem('token') || '';

axios.defaults.headers.common['Authorization'] = token;

const api = {};

// get list of books

api.getBooks = () => axios.get('api/books')
.then((res) => res.data);

// get one book

api.getBook = (bookId) => axios.get(`api/books/${bookId}`)
.then((res) => res.data);

// checkout book

api.checkout = (bookId, info) => axios.post(`api/checkout/${bookId}`, {...info})
.then((res) => res.data);

// renew book

api.renew = (bookId) => axios.post(`api/checkout/${bookId}`)
.then((res) => res.data);

// return book

api.return = (bookId) => axios.post(`api/return/${bookId}`)
.then((res) => res.data);

// add book

api.addBook = (book) => axios.post('api/add', {...book})
.then((res) => res.data);

export default api;