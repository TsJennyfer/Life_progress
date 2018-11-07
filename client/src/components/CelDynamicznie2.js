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
//import { timingSafeEqual } from 'crypto';


class CelDynamicznie2 extends React.Component {
    constructor(props) {
        super(props);
        this.findGoalById = this.findGoalById.bind(this);
        this.findAllGoals = this.findAllGoals.bind(this);
        this.drawGoalsTree = this.drawGoalsTree.bind(this);
        this.writeDetailsList = this.writeDetailsList.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeButtonColor = this.changeButtonColor.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
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

    componentDidMount() {
        this.setState({
            goalId: this.props.location.state.id
        }, this.findGoalById());
        // ten stan niżej jest pusty, ponieważ findGoalById wykonuje się asynchornicznie (a przynajmniej tak zaobserwowałem)
        console.log(this.state.allGoals, 'z CelDynamicznie - componentDidMount');
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
                    <div className="col-2">
                    <CSSTransitionGroup
                        key={key}
                        transitionName="subgoals"
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}
                        transitionAppear={true}
                        transitionAppearTimeout={800}>
                        
                            <div
                                key={key}
                                className={(this.state.goals[key].priority === 0) ? "button-sub-goal-done" : "button-sub-goal"}
                                id={key}
                                onClick={() => this.changePriority(key)}>
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

    writeDetailsList() {
        return (

            Object
                .keys(this.state.goals)
                .map(key =>
                    <form>
                        <div className="datails-list-form">
                            <label for="date">{this.state.goals[key].name}</label> <span className="details-list-form-element" name="date">zakończone lub nie</span><span>...coments</span >
                        </div>
                    </form>
                )

        );
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
                priority: this.state.goals[id].priority
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
        const priority = goals[id].priority;
        if (priority === 1) {
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

    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-1">
                        <Link to="/protected"> <img src={backButton} alt=""></img></Link>
                    </div>
                    <div className="col-11">
                        <button className="button-cel-glowny">
                            {(this.state.allGoals !== null) ? this.state.allGoals[0].name : " "}
                        </button></div>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            {this.drawGoalsTree()}
                        </div>
                    </div>
                </div>

                <h2>Details</h2>
                {this.writeDetailsList()}
                <br />
                <PodcelForm goal={this.state.allGoals} findAllGoals={this.findAllGoals} />

            </div>
        )
    }
}
export default CelDynamicznie2;