// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
//import { Timeline, TimelineEvent } from 'react-event-timeline'
import React from 'react';
import axios from 'axios';
import PodcelForm from './PodcelForm';
import { CSSTransitionGroup } from 'react-transition-group'

import '../css/Cele.css';
import '../css/App.css';
import '../css/PodceleAnimacje.css';
import Link from 'react-router-dom/Link';

class CelDynamicznie2 extends React.Component {
    constructor(props) {
        super(props);
        this.findGoalById = this.findGoalById.bind(this);
        this.findAllGoals = this.findAllGoals.bind(this);
        this.drawGoalsTree = this.drawGoalsTree.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeButtonColor = this.changeButtonColor.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.state = {
            goals: {},
            goalId: null,
            goal: null,
            isDone: false
        };
    }

    componentDidMount() {
        this.setState({
            goalId: this.props.location.state.id},this.findGoalById()) 
        
        // ten stan niżej jest pusty, ponieważ findGoalById wykonuje się asynchornicznie (a przynajmniej tak zaobserwowałem)
        console.log(this.state.goal, 'response 3');
        //this.findAllGoals();
    }

    // Znalezienie celu głównego
    findGoalById(event) {
        console.log(this.state.goal, 'response 3');
        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }

        axios.get('/goals/mainUserGoalAndSubgoals/' + this.props.location.state.id, {headers})
            .then(response => {

                this.setState({
                    goal: response.data.goals
                },
                    this.findAllGoals);     // findAllGoals wywołuję tutaj, a nie w componentDidMount, aby miec pewność, że setState zostało wykonane
                // console.log(response.data.mainGoal, 'goal 2!');
                // console.log(this.state.goal, 'response 2!');
            })
            .catch(err => {
                console.log(err, 'Goal not found, try again.');
            });
    }

    // Znalezienie wsystkich celi należących do celu głównego
    findAllGoals() {
        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }

        axios.get('/goals/main/children/' + this.state.goalId, {headers})
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
                    <CSSTransitionGroup
                        key = {key}
                        transitionName="subgoals"
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}
                        transitionAppear={true}
                        transitionAppearTimeout={800}>
                        <div className="goal-container">
                            <div
                                key = {key}
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

                        </div>
                    </CSSTransitionGroup>
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
        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }

        axios.patch("/goals/" + this.state.goals[id]._id,
            {
                priority: this.state.goals[id].priority
            },
        {headers}).then(response => {

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

        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }

        axios.delete("/goals/" + this.state.goals[id]._id, {headers})
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
            <div>
                <Link to="/protected"> <button>back</button></Link>
                <button className="button-cel-glowny">
                   {(this.state.goal !== null) ? this.state.goal[0].name : " " }
                </button> <br />
                <div className="grid-sub-goal">
                    {this.drawGoalsTree()}
                </div>
                <br />
                <PodcelForm goal={this.state.goal} findAllGoals={this.findAllGoals} />
            </div>
        )
    }
}
export default CelDynamicznie2;