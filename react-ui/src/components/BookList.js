import React, { Component, PropTypes } from 'react';

class BookList extends Component {
  render () {
    return (
      <div>
        List of books
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.array,
};

export default BookList;