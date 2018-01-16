import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from './SearchForm';
import SearchList from './SearchList';
import Modal from './Modal';

import { addBookAPI } from '../actions/bookActions';

class AddBook extends Component {

  state = {
    books: [],
    book: {},
    showModal: false,
    categories: ['College', 'Finacial Literacy', 'Healthy Relationship', 'History', 'Identity', 'Life Skills', 'Sexual Health'],
    category: '',
    title: '',
    author: ''
  }

  submitSearch = (books) => {
    this.setState({ books });    
  }

  handleSelect = (book) => {
    this.setState({
      showModal: true,
      title: book.title,
      author: book.authors.reduce((prev, curr) => prev + ', ' + curr),
      book
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
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

  addBook = () => {
    const newBook = {
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      id: this.state.book.id
    };
    this.props.addBook(newBook);
  }

  render() {
    const { categories, category, title, author } = this.state;
    return (
      <div>
        <SearchForm search={this.submitSearch} />
        <SearchList books={this.state.books} handleSelect={this.handleSelect}/>
        <Modal show={this.state.showModal} onClose={this.closeModal}>
          <div className="modal-dialog" role="document" onClick={this.modalClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addBookModal">Confirm Book Details</h5>
                <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        id="author"
                        value={author}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                      <select
                        type="text"
                        className="form-control"
                        name="category"
                        id="category"
                        value={category}
                        onChange={this.handleChange}
                      >
                        {categories.map((cat) => 
                          <option value={cat} key={cat}>{cat}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.addBook}>Add Book</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AddBook.propTypes = {
  addBook: PropTypes.func,
};

export default connect(
  null,
  { 
    addBook: addBookAPI,
  }
)(AddBook);