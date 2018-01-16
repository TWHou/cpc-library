import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class SearchForm extends Component {

  state = {
    isbn: '',
    intitle: '',
    inauthor: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isbn: '',
      intitle: '',
      inauthor: ''
    });
    let query = [];
    for (const key in this.state) {
      if (this.state[key] === '') {
        continue;
      }
      const value = encodeURIComponent(this.state[key]);
      query.push(`${key}:${value}`);
    }
    const queryString = query.reduce((prev, curr) => prev + '+' + curr);
    axios.get(`/api/search/${queryString}`)
      .then((res) => {
        const books = res.data.map((book) => ({
          id: book.id,
          ...book.volumeInfo
        }));
        this.props.search(books);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  render() {
    const { isbn, intitle, inauthor } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="isbn" className="col-sm-2 col-form-label">ISBN</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="isbn"
                id="isbn"
                value={isbn}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="intitle"
                id="title"
                value={intitle}
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
                name="inauthor"
                id="author"
                value={inauthor}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func,
};