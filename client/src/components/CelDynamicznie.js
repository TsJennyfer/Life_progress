// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
import { Timeline, TimelineEvent } from 'react-event-timeline'
import React from 'react';
import axios from 'axios';
import PodcelForm from './PodcelForm';
import { CSSTransitionGroup } from 'react-transition-group'

import '../css/Cele.css';
import '../css/App.css';
import '../css/PodceleAnimacje.css';

class CelDynamicznie extends React.Component {
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
            goalId: this.props.goalId,
            goal: {},
            isDone: false
        };
    }

    componentDidMount() {
        this.findGoalById();
        // ten stan niżej jest pusty, ponieważ findGoalById wykonuje się asynchornicznie (a przynajmniej tak zaobserwowałem)
        console.log(this.state.goal, 'response 3');
        //this.findAllGoals();
    }

    // Znalezienie celu głównego
    findGoalById(event) {
        axios.get('/goals/main/' + this.props.goalId)
            .then(response => {

                this.setState({
                    goal: response.data
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
        axios.get('/goals/main/childrenId/' + this.state.goal._id)
            .then(response => {

                this.setState({
                    goals: response.data
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
                        transitionName="subgoals"
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}
                        transitionAppear={true}
                        transitionAppearTimeout={800}>
                        <div className="goal-container">
                            <div
                                className={(this.state.goals[key].priority === 0) ? "button-sub-goal-done" : "button-sub-goal"}
                                id={key}
                                onClick={() => this.changePriority(key)}>
                                {this.state.goals[key].name}
                                <button type="button"
                                 className="btn btn-default btn-sm trash-btn" 
                                 onClick={() => this.removeGoal(key)}>
                                    <span class="glyphicon glyphicon-trash"></span>
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
        // podmiana załej listy podceli
        this.setState({ goals: goals });
        axios.patch("/goals/" + this.state.goals[id]._id,
            {
                priority: this.state.goals[id].priority
            }).then(response => {

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

        axios.delete("/goals/" + this.state.goals[id]._id)
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
                <button className="button-cel-glowny">
                    {this.state.goal.name}
                </button> <br />
                <div className="grid-sub-goal">
                    {this.drawGoalsTree()}
                </div>
                <br />
               {/* <Timeline>
                    <TimelineEvent title="xxx"
                        createdAt="2016-09-12 10:06 PM"
                        icon={<i className="material-icons md-18"></i>}>
                    </TimelineEvent>
                    <TimelineEvent
                        title="xxx"
                        createdAt="2016-09-11 09:06 AM"
                        icon={<i className="material-icons md-18"></i>}>
                    </TimelineEvent>
                    <TimelineEvent
                        title="xxx"
                        createdAt="2016-09-14 09:06 AM"
                        icon={<i className="material-icons md-18"></i>}>
                    </TimelineEvent>
                </Timeline>
               */}
                <br />
                <PodcelForm goal={this.state.goal} findAllGoals={this.findAllGoals} />
            </div>
        )
    }
}
export default CelDynamicznie;