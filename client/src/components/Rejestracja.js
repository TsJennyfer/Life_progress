// To jest komponent strony rejsetracji nowego użytkownika
import React from 'react';
import axios from 'axios';

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
    
    //zmienic na pole name

    render() {
        return (
            <div>
                <hr />
                <h2><u>Not a member? Create an account</u></h2>
                <form className="registerForm" onSubmit={this.addUser}>
                    <input
                        onChange={this.handleEmail}
                        name="name"
                        type="name"
                        value={this.state.name}
                        placeholder="Name"
                    />
                    <br/>
                    <input
                        onChange={this.handleEmail}
                        name="email"
                        type="email"
                        value={this.state.email}
                        placeholder="E-mail"
                    />
                    <br/>
                    <input
                        onChange={this.handlePassword}
                        name="password"
                        type="password"
                        minLength={3}
                        value={this.state.password}
                        placeholder="Password"
                    />
                    <br/>
                    <input
                        onChange={this.handlePassword}
                        name="password"
                        type="password"
                        minLength={3}
                        value={this.state.password}
                        placeholder="Confirm password"
                    />
                    </form>
                    <button className="button-main" type="submit">
                        Sign up<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                    
                    <br />
                    <button className="loginBtn loginBtn--google">
                    Login with Google
                </button> 
                <button className="loginBtn loginBtn--facebook">
                    Login with Facebook
                </button>
               
                
            </div>
        );
    }

}

export default Rejestracja;