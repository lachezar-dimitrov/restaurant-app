import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Aux from '../Aux/Aux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

  sideDrawerToggleHandler = () =>
    this.setState((previousState) => {
      return { showSideDrawer: !previousState.showSideDrawer };
    });

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />

        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />

        <div> Toolbar, SideDrawer, BackDrop</div>

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

export default connect(mapStateToProps)(Layout);
