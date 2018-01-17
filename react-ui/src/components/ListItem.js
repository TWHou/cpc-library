import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isOverdue } from '../utils/helpers';

class ListItem extends Component {

  handleClick = () => {
    this.props.onClick(this.props.book._id);
  }

  render () {
    const book = this.props.book;
    const status = book.onShelf ? 'On Shelf' : isOverdue(book.dueDate) ? 'Overdue' : 'Checked Out';
    return (
      <tr onClick={this.handleClick}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.category}</td>
        <td>{status}</td>
      </tr>
    );
  }
}

ListItem.propTypes = {
  book: PropTypes.object,
  onClick: PropTypes.func,
};

export default ListItem;