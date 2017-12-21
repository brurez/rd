import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopMenu from './TopMenu';
import Home from './Home';
import Posts from './Posts';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <TopMenu />
        <main className="App-content ui container padded segment">
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
