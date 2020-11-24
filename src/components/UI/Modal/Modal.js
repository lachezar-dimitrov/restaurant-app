import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import React from 'react';

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />

    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </>
);

modal.propTypes = {
  modalClosed: PropTypes.func.isRequired,
};

export default React.memo(
  modal,
  (previousProps, nextProps) =>
    previousProps.show === nextProps.show && previousProps.children === nextProps.children
);
