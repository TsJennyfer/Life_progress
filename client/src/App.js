/* Odpalanie projektu:
server: nodemon
client: npm run start */

import React, { Component } from 'react';
import './css/App.css';
import MainPage2 from './components/MainPage2';

class App extends Component {
  constructor () {
    super()
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