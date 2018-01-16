import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Header extends Component {



  render () {
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">HIV/AIDS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li> */}
            <li className="nav-item">
              <NavLink activeClassName='active' to='/new' className="nav-link">Add Book</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">All Books</a>
                <a className="dropdown-item" href="#">On Shelf</a>
                <a className="dropdown-item" href="#">Checked Out</a>
              </div>
            </li>
          </ul>
          <form className="form-inline">
            <label className="sr-only" htmlFor="username">Username</label>
            <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="username" placeholder="Username"/>

            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password" className="form-control form-control-sm mb-2 mr-sm-2" id="password" placeholder="Password"/>

            <button type="submit" className="btn btn-sm btn-primary mb-2">Login</button>
          </form>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  null
)(Header);