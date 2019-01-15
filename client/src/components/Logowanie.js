// To jest komponent strony logowania użytkownika
import React from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import '../css/RejestracjaLogowanie.css';
import { refreshHeader } from "./MainPage2";


class Logowanie extends React.Component {

    constructor(props) {
        super(props);

        this.logIn = this.logIn.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            email: "",
            password: "",
            token: ""
        }
    }



    //Logowanie
    logIn(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            password: event.target.value,
        });

        axios.post('/users/signin', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                console.log(response, 'User logged in!');
                this.setState({
                    token: response.headers.auth
                });
                localStorage.setItem('token', this.state.token);
                //this.props.checkToken();
                this.props.history.push({
                    pathname: '/protected',
                    state: {
                        userToken: this.state.token
                    }
                });
                refreshHeader();
            })
            .catch(err => {
                console.log(err);
                window.alert("Error in login, check the data");
            });

        this.setState({
            email: "",
            password: "",
        });
    }


    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
        <div className="container">
            <div className="row justify-content-center form-register">
                <div className="col-12">
                    <h2>Sign in</h2>
                    <hr />
                </div>
               <div className="col-8">
                    <form onSubmit={this.logIn}>
                        <div>
                            <input className = 'input_line'
                                onChange={this.handleEmail}
                                name="email"
                                type="email"
                                value={this.state.email}
                                placeholder="Your email"
                            />
                            <br />
                            <input className = 'input_line'
                                onChange={this.handlePassword}
                                name="password"
                                type="password"
                                minLength={6}
                                value={this.state.password}
                                placeholder="Your password"
                            />                    
                            <div>
                                <br />
                                <button className="button-main" type="submit">
                                    Sign in<i className="GuestBookButton2" aria-hidden="true" />
                                </button>
                                <div className="button-forgot-pass" id="sign-in" >
                                    <Link to="/ForgotPassword">Forgot password?</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        );
    }

}

export default Logowanie;