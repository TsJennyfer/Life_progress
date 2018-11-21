// To jest komponent dodawania nowego celu głównego
import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from "moment";
 
import "react-datepicker/dist/react-datepicker.css";
import '../css/Cele.css';

class CelGlownyForm extends React.Component {

    constructor(props) {
        super(props);

        this.addMainGoal = this.addMainGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: "",
            parent: null,
            userId: null,
            priority: 1,
            startDate: moment()
        }
    }


    addMainGoal(event) {
        event.preventDefault();
        const test = {
            name: this.state.name,
            parent: null,
            userId: this.state.userId,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority
        };
        console.log(test);

        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }
        console.log(headers);
        axios.post('/goals/',  {
            name: this.state.name,
            parent: null,
            userId: this.state.userId,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority
        },
        {headers})
            .then(response => {
                console.log(response, `Dodano cel główny ${this.state.name}`);
                alert("Dodano cel główny");
                this.props.findGoals();
                this.setState({
                    name: "",
                    parent: null

                });
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania celu głównego');
            });

        
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleUserIdChange(event) {
        this.setState({ userId: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({  priority: event.target.value });
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render() {
        return (
            <div className="row justify-content-center form-register">
                <div className="col-12">
                    <h2>Have something new? Add new main goal  </h2>   
                </div>
                <div className="col-8">
                    <form className="registerForm" onSubmit={this.addMainGoal}>
                        <div>
                            <form>
                                <input
                                    onChange={this.handleNameChange}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    minLength={3}
                                    placeholder="Goal name"

                                />
                                <input
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    placeholder="Category(optional)"
                                />
                                <div className="row justify-content-left form-margin">
                                    <DatePicker input
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    placeholder="Planning date"
                                />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    placeholder="Description(optional)"
                                />
                            </form>
                        </div>
                        <br />
                        <br />
                        <button className = "button-main" type="submit">
                            Add new<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

}

export default CelGlownyForm;