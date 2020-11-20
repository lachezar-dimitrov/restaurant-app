import { logout } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Logout extends Component {
  componentDidMount = () => this.props.onLogout();
  render = () => <Redirect to='/' />;
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Logout);
