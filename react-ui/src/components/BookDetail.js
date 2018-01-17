import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBookAPI } from '../actions/bookActions';
import { isOverdue } from '../utils/helpers';

class BookDetail extends Component {

  componentDidMount () {
    this.props.getBook(this.props.match.params.bookId);
  }
  
  render () {
    const { book } = this.props;
    const status = book.onShelf ? 'On Shelf' : isOverdue(book.dueDate) ? 'Overdue' : new Date(book.dueDate).getTime();
    const createMarkup = () => ({__html: book.description});
    const buttons = () => {
      if (book.onShelf) {
        return <button type="button" className="btn btn-success btn-block">Checkout</button>;
      }
      return <button type="button" className="btn btn-info btn-block">Return</button>;
    };
    return (
      <div className="row">
        <div className="col-md-4">
          <img className="img-fluid mx-auto d-block" src={book.image} alt={book.title} />
          <table className="table">
            <tbody>
              <tr>
                <th>Category</th>
                <td>{book.category}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{status}</td>
              </tr>
              {!book.onShelf && (
                <Fragment>
                  <tr>
                    <th>Due Date</th>
                    <td>{book.dueDate}</td>
                  </tr>
                  <tr>
                    <th>Renews Remaining</th>
                    <td>{Number.toString(3 - book.renewed)}</td>
                  </tr>
                  <tr>
                    <th>Borrowed By</th>
                    <td>{book.name}({book.email})</td>
                  </tr>
                </Fragment>
              )}
            </tbody>
          </table>
          {buttons()}
        </div>
        <div className="col-md">
          <h1 className="display-4">{book.title}</h1>
          <p className="lead">{book.author}</p>
          <div>
            <h3>Description</h3>
            <p dangerouslySetInnerHTML={createMarkup()} />
          </div>
        </div>
      </div>
    );
  }
}

BookDetail.propTypes = {
  match: PropTypes.object,
  book: PropTypes.object,
  getBook: PropTypes.func,
};

const mapStateToProps = ({ bookState }) => {
  if (bookState.book) {
    return { book: bookState.book };
  }
  return { book: {} };
};

export default connect(
  mapStateToProps,
  { 
    getBook: getBookAPI,
  }
)(BookDetail);