import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render () {
    return (
      <header>
        CPC PREP LIB HEADER
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

export default Header;