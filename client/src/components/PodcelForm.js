// To jest komponent dodawania nowego podcelu do celu głównego
import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from "moment";

import Icon_calendar from '../resourses/Icon_calendar.png';

class PodcelForm extends React.Component {

    constructor(props) {
        super(props);

        this.addSubGoal = this.addSubGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.state = {
            name: "",
            description: "",
            parent: null,
            priority: 1,
            startDate: moment()
        }
    }


    addSubGoal(event) {
        event.preventDefault();

        var headers = {
            'auth': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        console.log(headers);
        axios.post('/goals/', {
            name: this.state.name,
            parent: this.props.goal[0],
            userToken: localStorage.getItem('token'),
            priority: this.state.priority,
            plannedAt: this.state.startDate.valueOf(),
            description: this.state.description
        },
            { headers })
            .then(response => {
                console.log(response, `Dodano podcel ${this.state.name}`);
                this.setState({
                    name: ""
                });
                this.props.findAllGoals();
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania podcelu');
            });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div className="add_container">
                <div className="row justify-content-center form-register">
                    <div className="col-12">
                        <h2>Have something new? Add it! </h2>
                        <hr />
                    </div>
                    <div className="col-8">
                        <form className="registerForm" onSubmit={this.addSubGoal}>
                            <div>
                                <input className = 'input_line'
                                    onChange={this.handleNameChange}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    placeholder="Goal name"
                                    minlength={3}
                                    maxlength={100}
                                />
                                <div className="row justify-content-left form-margin ">
                                    <DatePicker type="input" className = 'input_line'
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                    <img src={Icon_calendar} width="30" height="30" alt=""
                                     className="d-inline-block align-top flex-row"></img>
                                </div>
                                <input className = 'input_line'
                                    onChange={this.handleDescriptionChange}
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    value={this.state.description}
                                    placeholder="Description(optional)"
                                    maxlength={1000}
                                />
                            </div>
                            <br />
                            <button className="button-main" type="submit">
                                Add new<i className="GuestBookButton2" aria-hidden="true" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default PodcelForm;