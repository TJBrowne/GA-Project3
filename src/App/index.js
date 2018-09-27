import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Home';
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="nav-links">
              <Link className="link" to="/">Home</Link>
              <Link className="link" to="/contact">My Account</Link>
              <Link className="link" to="/projects">Log-In/Register</Link>
            </div>
          </nav>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
