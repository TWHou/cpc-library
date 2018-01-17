import {
  RECEIVE_BOOKS,
  RECEIVE_BOOK,
  CHECKOUT_BOOK,
  RETURN_BOOK,
  ADD_BOOK
} from '../actions/bookActions';

const bookReducer = (state={}, action) => {
  switch(action.type) {
  case RECEIVE_BOOKS:
    return {
      ...state,
      books: action.books.reduce((accu, curr) => {
        accu[curr._id] = curr;
        return accu;
      }, {})
    };
  case RECEIVE_BOOK:
    return {
      ...state,
      book: action.book
    };
  case CHECKOUT_BOOK:
    return {
      ...state,
      books: {
        ...state.books,
        [action.book._id]: action.book
      },
      book: {
        ...state.book,
        name: action.book.name,
        email: action.book.email,
        dueDate: action.book.dueDate,
        borrowed: action.book.borrowed,
        onShelf: action.book.onShelf
      }
    };
  case RETURN_BOOK:
    return {
      ...state,
      books: {
        ...state.books,
        [action.book._id]: action.book
      },
      book: {
        ...state.book,
        name: null,
        email: null,
        dueDate: null,
        borrowed: null,
        renewed: action.book.renewed,
        onShelf: action.book.onShelf,
      }
    };
  case ADD_BOOK:
    return {
      ...state,
      book: action.book
    };
  default:
    return state;
  }
};

export default bookReducer;