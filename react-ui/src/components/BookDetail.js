import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from './Modal';
import { getBookAPI, checkoutAPI, returnAPI } from '../actions/bookActions';
import { isOverdue } from '../utils/helpers';

class BookDetail extends Component {

  state = {
    showCheckout: false,
    name: '',
    email: ''
  }

  closeCheckout = () => {
    this.setState({
      showCheckout: false,
      name: '',
      email: ''
    });
  }

  modalClick = (e) => {
    e.stopPropagation();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  openCheckout = () => {
    this.setState({
      showCheckout: true
    });
  }

  checkout = () => {
    const { name, email } = this.state;
    this.props.checkout(this.props.match.params.bookId, { name, email });
    this.closeCheckout();
  }

  returnBook = () => {
    this.props.returnBook(this.props.match.params.bookId);
  }

  componentDidMount () {
    this.props.getBook(this.props.match.params.bookId);
  }
  
  render () {
    const { book } = this.props;
    const { name, email } = this.state;
    const status = book.onShelf ? 'On Shelf' : isOverdue(book.dueDate) ? 'Overdue' : 'Checked Out';
    const createMarkup = () => ({__html: book.description});
    const buttons = () => {
      if (book.onShelf) {
        return <button type="button" className="btn btn-success btn-block" onClick={this.openCheckout}>Checkout</button>;
      }
      return <button type="button" className="btn btn-info btn-block" onClick={this.returnBook}>Return</button>;
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
                    <td>{new Date(book.dueDate).toDateString()}</td>
                  </tr>
                  <tr>
                    <th>Renews Remaining</th>
                    <td>{(3 - book.renewed).toString()}</td>
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
        <Modal show={this.state.showCheckout} onClose={this.closeCheckout}>
          <div className="modal-dialog" role="document" onClick={this.modalClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Checkout</h5>
                <button type="button" className="close" onClick={this.closeCheckout} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.closeCheckout}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.checkout}>Checkout</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

BookDetail.propTypes = {
  match: PropTypes.object,
  book: PropTypes.object,
  getBook: PropTypes.func,
  checkout: PropTypes.func,
  returnBook: PropTypes.func,
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
    checkout: checkoutAPI,
    returnBook: returnAPI
  }
)(BookDetail);