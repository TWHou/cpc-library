import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { trunc } from '../utils/helpers';

class SearchItem extends Component {

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  selectBook = () => {
    this.props.handleSelect(this.props.book);
  }

  render () {
    const book = this.props.book;
    return (
      <div className="col-sm-4">
        <div className="card my-3">
          <img className="card-img-top" src={book.imageLinks.thumbnail} alt={book.title} />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">Author(s): {book.authors.reduce((prev, curr) => prev + ', ' + curr)}</p>
            {book.description && <p className="card-text">{trunc(book.description)}</p>}
            <button
              className="btn btn-primary"
              onClick={() => this.props.handleSelect(book)}
            >
              Add this book
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = {
  book: PropTypes.object,
  handleSelect: PropTypes.func,
};

SearchItem.defaultProps = {
  book: {
    title: '',
    imageLinks: {},
    description: ''
  }
};

export default SearchItem;