import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import feather from '../resourses/feather.png';


class Header extends React.Component {
    render() {
        return (
            <div className="MyHeader d-flex">
                <a className="header-logo">
                    <img src={feather} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                    <span className="ml-3">LIFE PROGRESS</span>
                </a>
                <a className="header-button" ><Link to="/">About us</Link></a>
                <a className="header-button" id="sign-in" ><Link to="/signin">Sign in</Link></a>
                <a className="header-button" id="sign-up" ><Link to="/register">Sign up</Link></a>
            </div>
        )
    }
}

export default Header;