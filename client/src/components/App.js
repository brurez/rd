import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'moment/locale/pt-br';


import TopMenu from './TopMenu';
import Home from './Home';
import Footer from './Footer';
import Contact from './Contact';
import HowTo from './HowTo';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <TopMenu/>
          <main className="App-content ui container segment">
            <Route exact path="/" component={Home} />
            <Route path="/contact/:id" component={Contact}/>
            <Route path="/howto" component={HowTo} />
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
