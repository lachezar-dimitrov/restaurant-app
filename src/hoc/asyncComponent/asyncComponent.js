import React, { Component } from 'react';

const asyncComponent = (importComponent) =>
  class extends Component {
    state = {
      component: null,
    };

    componentDidMount = () =>
      importComponent().then((component) => this.setState({ component: component.default }));

    render = () => (this.state.component ? <this.state.component {...this.props} /> : null);
  };

export default asyncComponent;
