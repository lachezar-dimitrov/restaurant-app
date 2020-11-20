import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';
import classes from './Modal.css';

class Modal extends Component {
  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.show !== this.props.show || nextProps.children !== this.props.children;

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />

        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;
