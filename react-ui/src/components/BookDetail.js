import React, { Component } from 'react';
import PropTypes from 'prop-types';

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