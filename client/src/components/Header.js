import React from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from "react-redux"
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
            this.checkToken()
        );
    }

    componentDidUpdate(prevProps) {
        // sprawdzam token gdy zmieniają się props
        if (prevProps !== this.props) {
            this.checkToken();
        }
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
                    {(this.state.isUserLoggedIn === true) ?
                        <button className="button_logo">
                        <Link to="/">
                            <img src={feather} alt="" className="d-inline-block align-top flex-row"></img>
                        </Link>
                        Your online <b>To Do Board</b>
                        </button>
                        :
                        <button className="button_logo">
                            <Link to="/">
                                <img src={feather} alt="" className="d-inline-block align-top flex-row"></img>
                            </Link>
                            Your online <b>To Do Board</b>
                        </button>
                    }
                </div>
                {/*<div className="header-button" ><Link to="/">About us</Link></div>*/}
                {(this.state.isUserLoggedIn === true) ? <div className="header-button" ><Link to="/protected">Your goals</Link></div> : " "}
                {(this.state.isUserLoggedIn === false) ? <div className="header-button-register" id="sign-up" ><Link to="/register">Register</Link></div> : " "}
                {(this.state.isUserLoggedIn === false) ? <div className="header-button" id="sign-in" ><Link to="/signin">Sign in</Link></div> : " "}

                {/*(this.state.isUserLoggedIn === true) ? <div className="header-button" id="user-profile" ><Link to="/userProfile">Your account</Link></div> : " "*/}
                {(this.state.isUserLoggedIn === true) ? <div className="header-button" id="log-out" ><Link to="/" onClick={() => this.logOut()}>Log out</Link></div> : " "}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        math: state.math,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);