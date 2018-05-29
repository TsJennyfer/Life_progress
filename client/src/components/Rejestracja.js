// To jest komponent strony rejsetracji nowego użytkownika
import React from 'react';
import axios from 'axios';

import '../css/RejestracjaLogowanie.css';

class Rejestracja extends React.Component {

    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            email: "",
            userPassword: ""
        }
    }

    //Dodanie użytkownika
    addUser(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            userPassword: event.target.value,
        });

        axios.post('/user/signup', {
            email: this.state.email,
            userPassword: this.state.userPassword,
        })
            .then(response => {
                console.log(response, 'User added!');
            })
            .catch(err => {
                console.log(err, 'User not added, try again.');
            });

        this.setState({
            email: "",
            userPassword: "",
        });
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ userPassword: event.target.value });
    }

    render() {
        return (
            <div>
                <hr />
                <h2>Not a member? Create an account</h2>
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
                        name="userPassword"
                        type="password"
                        minLength={3}
                        value={this.state.userPassword}
                        placeholder="Your password"
                    />
                    <br />
                    <button className="button button1" type="submit">
                        Sign up<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                    
                    <br />
                    <button className="loginBtn loginBtn--google">
                    Login with Google
                </button> 
                <button className="loginBtn loginBtn--facebook">
                    Login with Facebook
                </button>
                </form>
                
            </div>
        );
    }

}

export default Rejestracja;