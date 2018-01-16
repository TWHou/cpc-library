import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBooksAPI } from '../actions/bookActions';
import ListItem from './ListItem';

class BookList extends Component {

  componentDidMount () {
    this.props.getBooks();
  }

  handleClick = (bookId) => {
    this.props.history.push(`/${bookId}`);
    console.log(`Clicked: ${bookId}`);
  }

  render () {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.books.map((book) => 
            <ListItem key={book._id} book={book} onClick={this.handleClick} />
          )}
          {!this.props.books && (<tr>
            <td colSpan="4">
              No books found.
            </td>
          </tr>)}
        </tbody>
      </table>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.func,
  books: PropTypes.array,
  history: PropTypes.object,
};

const mapStateToProps = ({ bookState }) => {
  if (bookState.books) {
    let books = Object.keys(bookState.books).map((bookId) => bookState.books[bookId]).filter((book) => book);
    return {
      books
    };
  } else {
    return {
      books: []
    };
  }
};

export default connect(
  mapStateToProps,
  { 
    getBooks: getBooksAPI,
  }
)(BookList);
