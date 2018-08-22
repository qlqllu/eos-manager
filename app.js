import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Account from './modules/account';
import Home from './modules/home';

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account">Account</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/account" component={Account}/>
        </div>
      </Router>
    );
  }
}

export default App;
