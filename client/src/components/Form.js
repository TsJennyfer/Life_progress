import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.state = {
      email: "",
      userPassword: "",
    };
  }

      handleEmail(event){
        this.setState({ email: event.target.value });
      }
      handlePassword(event){
          this.setState({ userPassword: event.target.value });
        }
        
        addUser = event => {
          event.preventDefault();
          this.setState({
            email: event.target.value,
            userPassword: event.target.value,
          });

          axios.post('/user/user', {
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

        render () {
          return (
          <div>
            <form className="registerForm" onSubmit={this.addUser}>
              <input
                onChange={this.handleEmail}
                name="email"
                type="email"
                className="EmailinputForm"
                value={this.state.email}
                placeholder="Enter your email"
                  />
              <input
                onChange={this.handlePassword}
                name="userPassword"
                type="password"
                minLength={3}
                className="PasswordinputForm"
                value={this.state.userPassword}
                placeholder="Type a password"
                />

                <button
                className="submitbuttonguestbook"
                type="submit"
                  >
                Add user<i className="GuestBookButton2" aria-hidden="true" />
                </button>
            </form>
         
            </div>
          )
        }
  }

export default Form;