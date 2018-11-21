// To jest komponent strony rejsetracji nowego użytkownika
import React from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

class Rejestracja extends React.Component {

    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    //Dodanie użytkownika
    addUser(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            password: event.target.value,
        });

        axios.post('/users/signup', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                console.log(response, 'User added!');
                this.props.history.push('/signin');
            })
            .catch(err => {
                console.log(err, 'User not added, try again.');
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
                        <h2>Not a member? Create an account</h2>
                        <hr />
                    </div>
                    <div className="col-8">
                        <form className="registerForm" onSubmit={this.addUser}>
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
                                <br />
                                <button className="button button-main" type="submit">
                                    Sign up<i className="GuestBookButton2" aria-hidden="true" />
                                </button>
                                <br />
                                <button className="loginBtn loginBtn--google">
                                    Login with Google
                                </button>
                                <button className="loginBtn loginBtn--facebook">
                                    Login with Facebook
                                </button>
                                <br />
                                <div className="button-forgot-pass" id="sign-in" >
                                <Link to="/signin">Already have an account?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Rejestracja;