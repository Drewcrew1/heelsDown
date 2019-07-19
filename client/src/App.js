import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Users from './components/Users';
function App() {
  return (
    <Router>
    <div className="App">
   

<Route path='/users' component={Users} />
    
    </div>
    </Router>
  );
}

export default App;
