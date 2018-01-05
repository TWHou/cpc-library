import {
  RECEIVE_BOOKS,
  RECEIVE_BOOK,
  ADD_BOOK
} from '../actions/bookActions';

const bookReducer = (state={}, action) => {
  switch(action.type) {
  case RECEIVE_BOOKS:
    return {
      ...state,
      books: action.books
    };
  case RECEIVE_BOOK:
    return {
      ...state,
      book: action.book
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