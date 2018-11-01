import React from 'react';
import {
    Link
} from 'react-router-dom';
import feather from '../resourses/feather.png';


class Header extends React.Component {
    render() {
        return (
            <div className="MyHeader d-flex">
                <div className="header-logo">
                    <img src={feather} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                    <span className="ml-3">LIFE PROGRESS</span>
                </div>
                <div className="header-button" ><Link to="/">About us</Link></div>
                <div className="header-button" id="sign-in" ><Link to="/signin">Sign in</Link></div>
                <div className="header-button" id="sign-up" ><Link to="/register">Sign up</Link></div>
                <div className="header-button" id="user-profile" ><Link to="/userProfile">Your account</Link></div>
            </div>
        )
    }
}

export default Header;