// To jest komponent dodawania nowego celu głównego
import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import Icon_calendar from '../resourses/Icon_calendar.png';

class CelGlownyForm extends React.Component {

    constructor(props) {
        super(props);

        this.addMainGoal = this.addMainGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateGoal = this.generateGoal.bind(this);

        this.state = {
            name: "",
            parent: null,
            userId: null,
            priority: 1,
            startDate: moment(),
            randomGoal: null
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
        axios.post('/goals/', {
            name: this.state.name,
            parent: null,
            userId: this.state.userId,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority,
            plannedAt: this.state.startDate.valueOf()
        },
            { headers })
            .then(response => {
                console.log(response, `Dodano cel główny ${this.state.name}`);
                alert("Main goal added");
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

    generateGoal() {
        axios.get('/randomGoals')
            .then(response => {
                console.log(response.data);
                this.setState({
                    randomGoal: response.data
                });
            });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleUserIdChange(event) {
        this.setState({ userId: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }

 /*   handleClick () {
        this.generateGoal();
        this.setState({ name: this.state.randomGoal.name });
      }*/
        
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }


    
    render() {
        return (
            <div>
                <div className="row justify-content-center form-register">
                    <div className="col-12" className="registerForm" >
                        <h2>Have something new? Add new goal category </h2>
                        <hr />
                        <div  className="registerForm">
                            <div className="row">
                                <div className="col-7" >
                                    <h3>   Don't have any ideas? Generate it </h3> 
                                </div>
                                <div className="col-4" >
                                    <button className="button-main-small" onClick={() => this.generateGoal() }   >
                                        {/*  <button className="button-main-small" onClick={(e) => this.handleClick(e)} > */}
                                        Generate
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7" >
                                    <h3>{(this.state.randomGoal !== null) ? this.state.randomGoal.name + "       " : ""}</h3>
                                </div>
                                <div className="col-4">  {(this.state.randomGoal !== null) ? 
                                    <button className="button-main-small" onClick={() => this.setState({ name: this.state.randomGoal.name })}>
                                    Take it</button> : ""} 
                                 </div>
                            </div>
                            <form className="registerForm" onSubmit={this.addMainGoal}>
                                <div className="col-10">
                                    <input className='input_line'
                                        onChange={this.handleNameChange}
                                        name="name"
                                        type="text"
                                        value={this.state.name}
                                        minLength={3}
                                        maxLength={40}
                                        placeholder="Goal name"
                                    />
                                    <div className="row justify-content-left form-margin">
                                        <h5> Deadline &nbsp; &nbsp; </h5>

                                        <DatePicker input className='input_line'
                                            dateFormat="DD/MM/YYYY"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            minDate={new Date()}
                                            placeholderText="Enter tomorrow"
                                            onClickOutside={this.openDatePicker}
                                            open={this.state.datePickerIsOpen}
                                        />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <button className="button-main" type="submit">
                                    Add new<i className="GuestBookButton2" aria-hidden="true" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

          {/*}  <div className="row justify-content-center form-register">
                    <div className="col-12">
                        <h2>Don't have any idea's? Generate it  </h2>
                        <hr />
                    </div>
                    <div className="col-7">
                        <button
                            className="button-main"
                            onClick={() => this.generateGoal()} >
                            Generate<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>
                            {(this.state.randomGoal !== null) ? this.state.randomGoal.name + "       " : ""}
                            {(this.state.randomGoal !== null) ? <button onClick={() => this.setState({ name: this.state.randomGoal.name })}>Take it!</button> : ""}
                        </h3>
                    </div>
                </div>
                
        */}
            </div>
        );
    }

}

export default CelGlownyForm;