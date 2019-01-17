import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import done from '../resourses/done_icon.png';


class Public extends Component {
  componentDidMount() {
    this.checkToken();
  }

  // przekierowanie do strony dla zalogowanych
  goToProtected = () => {
    this.props.history.push('/protected');
  }

  // sprawdzenie czy jest token
  checkToken = () => {
    if (localStorage.getItem('token') !== null) {
      this.goToProtected();
    }
  }

  render() {
    return (
      <div className="main__container">
        <div className="container">
          <div className="row justify-content-center welcome">
            <div className="col-10 ml-5">
              <h1>Welcome to</h1>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-10 ml-5">
              <h1> Life progress</h1>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
          <div className="col-sm-5,7">
            <h3>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Get organized in seconds<br />
              </div>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Planning tasks<br />
              </div>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Measure progress<br />
              </div>
            </h3>
          </div>
          <div className="col-sm-6,99">
            <h3>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Feel organized and motivated<br />
              </div>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Have got any big goals to split?<br />
              </div>
              <div className='form-margin'>
                <img src={done} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                &emsp; Use our app to granulate it!<br />
              </div>
            </h3>
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