import React, { Component, PropTypes } from 'react';

class BookDetail extends Component {
  render () {
    return (
      <div>
        Detail of book {this.props.match.params.bookId}
      </div>
    );
  }
}

BookDetail.propTypes = {
  match: PropTypes.object,
};

export default BookDetail;