// To jest komponent strony logowania użytkownika
import React from 'react';
import axios from 'axios';

class Logowanie extends React.Component {

    constructor(props) {
        super(props);

        this.logIn = this.logIn.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            email: "",
            userPassword: "",
            token: ""
        }
    }


    //Logowanie
    logIn(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            userPassword: event.target.value,
        });

        axios.post('/user/signin', {
            email: this.state.email,
            userPassword: this.state.userPassword,
        })
            .then(response => {
                console.log(response, 'User logged in!');
                this.setState({
                    token: response.data.token
                });
                localStorage.setItem('token', this.state.token);
                this.props.checkToken();
            })
            .catch(err => {
                console.log(err, 'User not logged in.');
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
                Logowanie
                <form className="loginForm" onSubmit={this.logIn}>
                    <input
                        onChange={this.handleEmail}
                        name="email"
                        type="email"
                        value={this.state.email}
                        placeholder="Podaj email"
                    />
                    <br />
                    <input
                        onChange={this.handlePassword}
                        name="userPassword"
                        type="password"
                        minLength={3}
                        value={this.state.userPassword}
                        placeholder="Podaj hasło"
                    />                    
                    <br />
                    <button class="button button1" type="submit">
                        Zaloguj się<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }

}

export default Logowanie;