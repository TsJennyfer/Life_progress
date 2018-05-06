/* Odpalanie projektu:
server: nodemon
client: npm run start */


import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
// import formularza
import Form from './components/Form';
import MainPage from './components/MainPage';

class App extends Component {
  constructor () {
    super()
    this.state = {
      goal: {}
    }

  this.handleClick = this.handleClick.bind(this)
    //example variable declaration
    this.goals = 'Maraton'
  }

  handleClick () {
    axios.get('/goal/' + this.goals)
      .then(function(response){console.log(response.data)});
  }

  render () {
    return (
      <div>
        <center>
        <MainPage />
        </center>
      </div>
    )
  }
}
export default App