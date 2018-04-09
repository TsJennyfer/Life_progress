import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
// import formularza
import Form from './components/Form';

class App extends Component {
  constructor () {
    super()
    this.state = {
      goal: ''
    }

    this.handleClick = this.handleClick.bind(this)
    //example variable declaration
    this.goals = 'Maraton'
  }

  
  handleClick () {
    axios.get('/api/goal/' + this.goals)
      .then(function(response){console.log(response.data)});
  }

  render () {
    return (
      <div className='button__container'>
        <button  className='button' onClick={this.handleClick}>Click Me</button>
        <p>{this.state.goal}</p>
        {/* tutaj jest wstawiony formularz, który jest w components/Form.js*/} 
        <Form />
      </div>
    )
  }
}
export default App