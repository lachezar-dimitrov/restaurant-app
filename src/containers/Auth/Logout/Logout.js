import { logout } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

export const Logout = ({ onLogout }) => {
  useEffect(() => onLogout(), [onLogout]);

  return <Redirect to={'/'} />;
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Logout);
