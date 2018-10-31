/* Odpalanie projektu:
server: nodemon
client: npm run start */

import React, { Component } from 'react';
import './css/App.css';
import axios from 'axios';
import Public from './components/Public'

import MainPage2 from './components/MainPage2';

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
          <MainPage2 /> 
      </div>
    )
  }
}
export default App