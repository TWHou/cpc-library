import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

class Modal extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" onClick={this.props.onClose}>
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;