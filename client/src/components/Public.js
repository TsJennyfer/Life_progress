import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Public extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    //this.props.history.push('/register');
  }
  render() {
    return (
      <div className="main__container">
        <div className="container">
          <div className="row justify-content-center welcome">
            <div className="col-8 ml-5">
              <h1>Welcome to</h1>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-8 ml-5">
              <h1> Life progress</h1>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-3">
              <h3>Planning aplication to<br /> organize...</h3>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <Link to="/register">
                <button className="button-get-started">
                  <span>Get started</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Public;