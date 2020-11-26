import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import React from 'react';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error && error.message}
        </Modal>

        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
