import React from 'react';
import {
    Link
} from 'react-router-dom';
import feather from '../resourses/lp-trans2.png';


class Header extends React.Component {
    render() {
        return (
            <div className="MyHeader d-flex">
                <link href='http://fonts.googleapis.com/css?family=Berkshire+Swash' rel='stylesheet' type='text/css' />           
                <div className="header-logo">
                    <button className="button_logo">
                        <Link to="/">
                            <img src={feather} width="150" height="70" alt="" className="d-inline-block align-top flex-row"></img>
                            </Link>
                    </button>
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