import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchItem from './SearchItem';

export default class SearchList extends Component {
  render() {
    return (
      <div className="card-deck flex-wrap">
        {this.props.books.map((book) =>
          <SearchItem key={book.id} book={book} handleSelect={this.props.handleSelect}/>
        )}
      </div>
    );
  }
}

SearchList.propTypes = {
  books: PropTypes.array,
  handleSelect: PropTypes.func,
};