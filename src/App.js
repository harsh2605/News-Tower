import './App.css';

//this whole template generates by typing rcc (for more refernce and shortcut keys you can see the page ES7 react redux by microsoft)
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends Component {
  PageSize = 6;
  render() {
    return (

      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"><News key="general" pageSize={this.PageSize} country="in" category="general" /></Route>
            <Route exact path="/business"><News key="business" pageSize={this.PageSize} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={this.PageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/general"><News key="general" pageSize={this.PageSize} country="in" category="general" /></Route>
            <Route exact path="/health"><News key="health" pageSize={this.PageSize} country="in" category="health" /></Route>
            <Route exact path="/science"><News key="science" pageSize={this.PageSize} country="in" category="science" /></Route>
            <Route exact path="/sports"><News key="sports" pageSize={this.PageSize} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News key="technology" pageSize={this.PageSize} country="in" category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

