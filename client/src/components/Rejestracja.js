// To jest komponent strony rejsetracji nowego użytkownika
import React from 'react';
import axios from 'axios';
import {
Link
} from 'react-router-dom';
import HandbookDoc from '../resourses/policies.pdf';

class Rejestracja extends React.Component {

    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.isPasswordsEqual = this.isPasswordsEqual.bind(this);
        this.state = {
            email: "",
            password1: "",
            password2: ""
        }
    }

    // sprawdzanie zgodności haseł
    isPasswordsEqual() {
        if (this.state.password1 === this.state.password2) {
            console.log("takie same");
            return true
        } else {
            console.log("różne");
            return false;
        }
    }
    //Dodanie użytkownika
    addUser(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            password1: event.target.value,
            password2: event.target.value
        });

        if (this.isPasswordsEqual()){

            axios.post('/users/signup', {
                email: this.state.email,
                password1: this.state.password1,
                password1: this.state.password2
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
                password1: "",
                password2: ""
            });
        } else {
            window.alert("Passwords must match");
        }
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword1(event) {
        this.setState({ password1: event.target.value });
    }

    handlePassword2(event) {
        this.setState({ password2: event.target.value });
    }

    handlePoliciesClick = () => {
        window.open(HandbookDoc, '_blank');
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
                            <div>
                                <div>
                                    <input className='input_line'
                                        onChange={this.handleEmail}
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Your email"
                                    />
                                </div>
                                <div>
                                    <input className='input_line'
                                        onChange={this.handlePassword1}
                                        type="password"
                                        minLength={6}
                                        value={this.state.password1}
                                        placeholder="Your password"
                                    />
                                    <input className='input_line'
                                        onChange={this.handlePassword2}
                                        type="password"
                                        minLength={6}
                                        value={this.state.password2}
                                        placeholder="Confirm password"
                                    />
                                </div>
                                <div className="row justify-content-center form-margin">
                                    <div className="registerForm">
                                       <div className="row justify-content-center form-margin">
                                              <h5>  
                                                  <div className="button-forgot-pass" id="sign-in" >
                                                  <input type="checkbox" required name="terms" />
                                                   <a onClick={this.handlePoliciesClick} className = 'ml-2'>I agree to the  Privacy Policy.</a>
                                                    </div>
                                                </h5>
                                        </div>
                                        <div className="row justify-content-center form-margin">
                                            <button className="button button-main" type="submit">
                                                Register
                                                <i className="GuestBookButton2" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <div className="button-forgot-pass" id="sign-in" >
                                            <Link to="/signin">Already have an account?</Link>
                                        </div>
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

export default Rejestracja;