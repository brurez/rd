import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import TopMenu from './TopMenu';
import Home from './Home';
import Footer from './Footer';
import Contact from './Contact';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopMenu/>
          <main className="App-content ui container padded segment">
            <Route exact path="/" component={Home} />
            <Route path="/contact/:id" component={Contact}/>
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
