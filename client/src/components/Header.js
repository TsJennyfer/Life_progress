import React from 'react';
import {
    Link
} from 'react-router-dom';
import feather from '../resourses/lp-trans2.png';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.checkToken = this.checkToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            isUserLoggedIn: true
        };
    }
    componentDidMount() {
        window.addEventListener('localStorage', 
            console.log("Slucham")
        //this.checkToken();
        );
    }

    // sprawdzenie czy jest token
    checkToken() {
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isUserLoggedIn: true
            });
        } else {
            this.setState({
                isUserLoggedIn: false
            });
        }
    }

    logOut() {
        localStorage.removeItem('token');
        this.checkToken();
    }


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
                {/*<div className="header-button" ><Link to="/">About us</Link></div>*/}
                {(this.state.isUserLoggedIn === false) ? <div className="header-button" id="sign-in" ><Link to="/signin">Sign in</Link></div> : " "}
                {(this.state.isUserLoggedIn === false) ? <div className="header-button" id="sign-up" ><Link to="/register">Sign up</Link></div> : " "}
                {(this.state.isUserLoggedIn === true) ? <div className="header-button" id="user-profile" ><Link to="/userProfile">Your account</Link></div> : " "}
                <div className="header-button" id="log-out" ><Link to="/" onClick={() => this.logOut()}>Log out</Link></div>
            </div>
        )
    }
}

export default Header;