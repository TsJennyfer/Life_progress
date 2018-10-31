import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



class Home extends Component {
    constructor(props) {
        super()
    }
    
    componentDidMount(){
        this.props.history.push('/about');
    }
  render() {
    return (
      <h1>siemnako</h1>
    );
  }
}

export default Home;