import React from "react";
import Nav from "./components/Nav";

import HomePage from "./pages/HomePage/HomePage";
import Articles from './pages/Articles';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Nav /> 
      <Router>
        <div>
          <Route exact path='/' component={HomePage} />
          <Route exact path="/articles" component={Articles} />
        </div>
      </Router>
    </div>
  );
}

export default App;
