
// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
import {Timeline, TimelineEvent} from 'react-event-timeline'
import React from 'react';
import axios from 'axios';
import PodcelForm from './PodcelForm';

import '../css/Cele.css';

class CelDynamicznie extends React.Component {
    constructor(props) {
        super(props);
        this.findGoalById = this.findGoalById.bind(this);
        this.findAllGoals = this.findAllGoals.bind(this);
        this.drawGoalsTree = this.drawGoalsTree.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeButtonColor = this.changeButtonColor.bind(this);
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
                //console.log(response, 'Wszystkie podcele znalezione');
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
                    <button
                        className={(this.state.goals[key].priority === 0) ? "button-sub-goal-done" : "button-sub-goal"}
                        id={key}
                        onClick={() => this.changePriority(key)}>
                        {this.state.goals[key].name}
                    </button>
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
        // this.changeButtonColor(id);
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


    render() {
        return (
            <div>
            
                <button className="button-cel-main">
                    {this.state.goal.name}
                </button> <br />
                <div class = "grid-sub-goal">
                {this.drawGoalsTree()}
                </div>
                <br />
                <Timeline>
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
                <br />
                <PodcelForm goal={this.state.goal} findAllGoals={this.findAllGoals} />
            </div>
        )
    }
}
export default CelDynamicznie;