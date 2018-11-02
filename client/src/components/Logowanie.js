// To jest komponent strony logowania użytkownika
import React from 'react';
import axios from 'axios';

import '../css/RejestracjaLogowanie.css';


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
                this.props.checkToken();
            })
            .catch(err => {
                console.log(err, 'User not logged in.');
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
        <div>
    <       hr />
            <div className="row justify-content-center form-login">
            <div className="col-12">
                <h2><u>Sign in</u></h2>
               </div>
                <form className="loginForm" onSubmit={this.logIn}>
                    <input
                        onChange={this.handleEmail}
                        name="email"
                        type="email"
                        value={this.state.email}
                        placeholder="Your email"
                    />
                    <br />
                    <input
                        onChange={this.handlePassword}
                        name="password"
                        type="password"
                        minLength={3}
                        value={this.state.password}
                        placeholder="Your password"

                    />                    
                    <div>
                    <button className="button-main" type="submit">
                        Sign in<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                    <a className="button-forgot-pass" >
                        Forgot password?
                    </a>
                    </div>
                </form>
            </div>
            </div>

        );
    }

}

export default Logowanie;