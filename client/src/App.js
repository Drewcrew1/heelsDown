import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Users from './components/Users';
import Farms from './components/Farms';
import Trainers from './components/Trainers';
function App() {
  return (
    <Router>
    <div className="App">
   

<Route path='/users' component={Users} />
        <Route path='/farms' component={Farms} />
        <Route path='/trainers' component={Trainers} />
    
    </div>
    </Router>
  );
}

export default App;
