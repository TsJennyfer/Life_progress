// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
//import { Timeline, TimelineEvent } from 'react-event-timeline'
import React from 'react';
import axios from 'axios';
import PodcelForm from './PodcelForm';
import { CSSTransitionGroup } from 'react-transition-group'
import '../css/App.css';
import '../css/PodceleAnimacje.css';
import Link from 'react-router-dom/Link';
import backButton from '../resourses/back-button.png';
import arrowDown from '../resourses/arrow-down2.png';
import arrowUp from '../resourses/arrow-up2.png';

import 'react-day-picker/lib/style.css';

//import { timingSafeEqual } from 'crypto';


class CelDynamicznie2 extends React.Component {
    constructor(props) {
        super(props);
        this.convertTimestampToDate = this.convertTimestampToDate.bind(this);
        this.findGoalById = this.findGoalById.bind(this);
        this.findAllGoals = this.findAllGoals.bind(this);
        this.drawGoalsTree = this.drawGoalsTree.bind(this);
        this.writeDetailsList = this.writeDetailsList.bind(this);
        this.writeDetailsListColumnNames = this.writeDetailsListColumnNames.bind(this);
        this.expandDescription = this.expandDescription.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeCompleted = this.changeCompleted.bind(this);
        this.changeButtonColor = this.changeButtonColor.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.removeThisGoalAndSubgoals = this.removeThisGoalAndSubgoals.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeDescriptionInDatabase = this.changeDescriptionInDatabase.bind(this);
        this.changeMainGoalName = this.changeMainGoalName.bind(this);
        this.state = {
            goals: {},
            goalId: null,
            allGoals: null,
            isDone: false,
            header: {
                headers: {
                    'auth': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        };
    }

    convertTimestampToDate(timestamp) {
        var t = new Date(timestamp);
        var date = t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear();
        return date;
    }

    componentDidMount() {
        this.setState({
            goalId: this.props.location.state.id
        }, this.findGoalById());
        // ten stan niżej jest pusty, ponieważ findGoalById wykonuje się asynchornicznie (a przynajmniej tak zaobserwowałem)
        console.log(this.state.allGoals, 'z CelDynamicznie - componentDidMount');
    }

    handleDayMouseEnter(day, { firstOfMonth }) {
        if (firstOfMonth) {
            // Do something when the first day of month has been mouse-entered
        }
    }

    handleDayClick(day, { sunday, disabled }) {
        if (sunday) {
            window.alert('Sunday has been clicked');
        }
        if (disabled) {
            window.alert('This day is disabled');
        }
    }

    // Znalezienie celu głównego
    findGoalById(event) {
        console.log(this.state.allGoals, 'z findGoalById');

        axios.get('/goals/mainUserGoalAndSubgoals/' + this.props.location.state.id, this.state.header)
            .then(response => {

                this.setState({
                    allGoals: response.data.goals
                },
                    this.findAllGoals);     // findAllGoals wywołuję tutaj, a nie w componentDidMount, aby miec pewność, że setState zostało wykonane
                // console.log(this.state.allGoal, 'response 2!');
            })
            .catch(err => {
                console.log(err, 'Goal not found, try again.');
            });
    }

    // Znalezienie wszstkich celi należących do celu głównego
    findAllGoals() {
        axios.get('/goals/main/children/' + this.state.goalId, this.state.header)
            .then(response => {

                this.setState({
                    goals: response.data.goals
                });
            })
            .catch(err => {
                console.log(err, 'Goal not found, try again.');
            });

    }


    // Rysowanie głównych celów
    drawGoalsTree() {
        console.log(this.state.goals);
        return (
            Object
                .keys(this.state.goals)
                .map(key =>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-3" key={key}>
                        <CSSTransitionGroup
                            key={key}
                            transitionName="subgoals"
                            transitionEnterTimeout={5000}
                            transitionLeaveTimeout={3000}
                            transitionAppear={true}
                            transitionAppearTimeout={800}>
                            <div
                                key={key}
                                className={(this.state.goals[key].completed === true) ? "button-sub-goal-done" : "button-sub-goal"}
                                id={key}
                                onClick={() => this.changeCompleted(key)}
                            >
                                {(this.state.goals !== null) ? this.state.goals[key].name : " "}
                                <button type="button"
                                    className="btn btn-default btn-sm trash-btn"
                                    onClick={() => this.removeGoal(key)}>
                                    <span className="glyphicon glyphicon-trash"></span>
                                </button>
                            </div>
                        </CSSTransitionGroup>
                    </div>
                )
        );

    }

    writeDetailsListColumnNames() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-3 col-5">
                        <div className="datails-list-form">
                            <label >Task</label>
                        </div>
                    </div>

                    <div className="col-1">
                        Done?
                            </div>
                    <div className="col-sm-4 col-5">
                        <span className="details-list-form-element" name="date">End time</span>
                    </div>
                    <div className="col-1">
                        <span>Description</span >
                    </div>
                </div>
            </div>
        )
    }

    // lista podceli
    writeDetailsList() {
        return (
            Object
                .keys(this.state.goals)
                .map(key =>
                    <div className="container" key={key}>
                        <div className="row justify-content-center">
                            <div className="col-sm-3 col-5">
                                <div className="datails-list-form">
                                    <label >{this.state.goals[key].name}</label>
                                </div>
                            </div>

                            <div className="col-1">
                                <input type="checkbox" checked={this.state.goals[key].completed} onClick={() => this.changeCompleted(key)}></input>
                            </div>
                            <div className="col-sm-4 col-5">
                                <span className="details-list-form-element" name="date">{this.convertTimestampToDate(this.state.goals[key].plannedAt)}</span>
                            </div>
                            <div className="col-1">
                                {(this.state.goals[key].isDescription === true)
                                    ? <img src={arrowUp} onClick={() => this.expandDescription(key)} width="20" height="20" alt=""></img>
                                    : <img src={arrowDown} onClick={() => this.expandDescription(key)} width="20" height="20" alt=""></img>}
                            </div>
                        </div>
                        <div className={(this.state.goals[key].isDescription === true) ? "row justify-content-center" : "row justify-content-center"} >
                            {(this.state.goals[key].isDescription === true) ?
                                <textarea multiline={true} rows={3} placeholder="Write description" onChange={(event) => this.changeDescription(key, event)}
                                    onBlur={(event) => this.changeDescriptionInDatabase(key, event)}
                                    maxLength={1000}
                                    className="col-8 description-subgoal" value={this.state.goals[key].description}>

                                </textarea> : ""}
                        </div>
                    </div>
                )

        );
    }

    // zmiana nazwy celu głównego
    changeMainGoalName(event) {
        const allGoals = { ...this.state.allGoals };
        allGoals[0].name = event.target.value;
        this.setState({ allGoals: allGoals });
        axios.patch("/goals/updateName/" + this.state.allGoals[0]._id,
            {
                "name": this.state.allGoals[0].name
            },
            this.state.header).then(response => {
                //console.log(response)
            })
            .catch(err => {
                //console.log(err);
            });
    }

    // zmienia stan pola description dla danego podcelu
    changeDescription(id, event) {
        const goals = { ...this.state.goals };
        goals[id].description = event.target.value;
        this.setState({ goals: goals });
    }

    // zmienia stan pola description  dla danego celu w bazie danych
    changeDescriptionInDatabase(id, event) {
        axios.patch("/goals/updateDescription/" + this.state.goals[id]._id,
            {
                "description": this.state.goals[id].description
            },
            this.state.header).then(response => {
                //console.log(response)
            })
            .catch(err => {
                //console.log(err);
            });
    }

    // rozwijanie opisów podcelu
    expandDescription(id) {
        const goals = { ...this.state.goals };
        const isDescription = goals[id].isDescription;
        if (isDescription === false) {
            goals[id].isDescription = true;
        } else {
            goals[id].isDescription = false;
        }
        this.setState({ goals: goals });

    }

    changeCompleted(id) {
        // kopia aktualnych celów
        const goals = { ...this.state.goals };

        const completed = goals[id].completed;
        if (completed === false) {
            goals[id].completed = true;
        } else {
            goals[id].completed = false;
        }
        this.setState({ goals: goals });
        axios.patch("/goals/" + this.state.goals[id]._id,
            {
                "completed": this.state.goals[id].completed
            },
            this.state.header).then(response => {
                //console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
    }

    changePriority(id) {
        // kopia aktualnych celów
        const goals = { ...this.state.goals };
        // zmiana status 1 <-> 0
        const priority = goals[id].priority;
        if (priority === 1) {
            goals[id].priority = 0;
        } else {
            goals[id].priority = 1;
        }
        // podmiana całej listy podceli
        this.setState({ goals: goals });

        axios.patch("/goals/" + this.state.goals[id]._id,
            {
                //priority: this.state.goals[id].priority
                "completed": true
            },
            this.state.header).then(response => {

                console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
    }

    changeButtonColor(id) {
        // kopia aktualnych celów
        const goals = { ...this.state.goals };
        // zmiana status 1 <-> 0
        const completed = goals[id].completed;
        if (completed === true) {
            this.setState({ isDone: true });
        } else {
            this.setState({ isDone: false });
        }
    }

    removeGoal(id) {
        //delete this.state.goals[id]; poźniej tak

        axios.delete("/goals/" + this.state.goals[id]._id, this.state.header)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
        this.findAllGoals();

    }

    removeThisGoalAndSubgoals() {
        if (window.confirm("Do you want to remove this main goal and all subgoals?")) {
            axios.delete("/goals/" + this.state.allGoals[0]._id, this.state.header)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                });
            this.props.history.push({
                pathname: '/protected'
            });
            alert("Goal has been removed");
        }
    }

    render() {
        return (
            <div className="row justify-content-center form-register">

                <div className="container">
                    <div className="background_white">
                        <div className="row align-items-center">
                            <div className="col-1">
                                <Link to="/protected"> <img src={backButton} alt=""></img></Link>
                            </div>
                            <div className="col-10">
                                <h2>
                                    <input type="text"
                                        maxLength={40}
                                        className="main-goal-name-editable"
                                        value={(this.state.allGoals !== null) ? this.state.allGoals[0].name : " "}
                                        onChange={(event) => this.changeMainGoalName(event)}
                                    />
                                </h2>

                            </div>
                            <div className="col-1">
                                <button className="glyphicon glyphicon-trash trash-main-goal"
                                    onClick={() => this.removeThisGoalAndSubgoals()}>
                                </button>
                            </div>
                            {/*<div className="col-12">
                                {(this.state.allGoals !== null) ? this.state.allGoals[0].description : ""}
        </div>*/}
                            <div className="col-12">
                                <hr />
                            </div>




                            { /*  <div className="col-sm-4">

                            <DayPicker
                                disabledDays={new Date()}
                                onDayClick={this.handleDayClick}
                                onDayMouseEnter={this.handleDayMouseEnter}
                            />

                        </div>
        
                            <div className="row">
                                <div className="col-11">
                                </div>
                            </div>*/}

                            <div className="row">
                                <div className="container">
                                    <div className="row justify-content-center form-register">
                                        {this.drawGoalsTree()}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center form-register">
                                <div className="col-11">
                                    <h2>Details</h2>
                                    <hr />
                                </div>
                                {this.writeDetailsListColumnNames()}
                                {this.writeDetailsList()}
                                <br />
                                <PodcelForm goal={this.state.allGoals} findAllGoals={this.findAllGoals} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CelDynamicznie2;