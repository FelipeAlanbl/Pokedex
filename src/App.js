import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Pokemon from './pages/Pokemon';
import Home from './pages/Home'


class App extends Component {


  render() {
      return(
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/pokemon/:name" component={Pokemon} />
            </Switch>
          </BrowserRouter>  

        </div>
      );
  }
}


export default App;