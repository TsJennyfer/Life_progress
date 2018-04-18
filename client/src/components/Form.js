import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleGoal = this.handleGoal.bind(this);

    this.state = {
      email: "",
      userPassword: "",
      // cele są obiektami
      goal: {}

    };
  }

  // wyświetlanie jednego celu
  // wyswietlCel(nazwa) {
  //   nazwa.preventDefault();
  //   const cele = {...this.state.goal};


  //   axios.get('/goals/' + this.state.goal, {
  //     //goal: this.state.goal,
  //   })
  //     .then(response => {

  //       //cele[response.data.name] = response.data;
  //       console.log(response, 'Goal found!');
  //     })
  //     .catch(err => {
  //       console.log(err, 'Goal not found, try again.');
  //     });

  //   this.setState({
  //     goal: "",
  //   });
  // }



  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ userPassword: event.target.value });
  }

  handleGoal(event) {
    this.setState({ goal: event.target.value });
  }

  //Dodanie użytkownika
  addUser = event => {
    event.preventDefault();
    this.setState({
      email: event.target.value,
      userPassword: event.target.value,
    });

    axios.post('/user', {
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

  //Znalezienie celu
  findGoal = event => {
    event.preventDefault();


    axios.get('/goals/' + this.state.goal, {
      goal: this.state.goal,
    })
      .then(response => {

        this.setState({
          goal: response.data,
        });
        console.log(response, 'Goal found!');
      })
      .catch(err => {
        console.log(err, 'Goal not found, try again.');
      });

  }

  render() {
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
        <form className="FindGoalForm" onSubmit={this.findGoal}>
          <input
            onChange={this.handleGoal}
            name="goal"
            type="text"
            className="GoalinputForm"
            value={this.state.goal}
            placeholder="Enter your goal"
          />

          <button
            className="submitgoal"
            type="submit"
          >
            Find goal<i className="SubmitGoal" aria-hidden="true" />
          </button>
        </form>
      </div>

    )
  }
}

export default Form;