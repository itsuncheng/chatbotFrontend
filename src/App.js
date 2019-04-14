import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './containers/HomePage';
// import { Container } from 'semantic-ui-react';

const appStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#398eb2'
};

class App extends Component {
  render() {
    return (
      <div className="App" style={appStyle}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
export default App;
