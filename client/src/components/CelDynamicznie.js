
// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
import React from 'react';
import axios from 'axios';



const Main_goal = () => {
    return (
        <div>
            Eloszki
      </div>
    );
}



class CelDynamicznie extends React.Component {
    constructor(props) {
        super(props);

        this.findGoalById = this.findGoalById.bind(this);
        this.findAllGoals = this.findAllGoals.bind(this);
        this.drawGoalsTree = this.drawGoalsTree.bind(this);

        this.state = {
            goals: {},
            goalId: this.props.goalId,
            goal: {},    // cel główny
            tempGoal: {}    // 
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
        axios.get('/goals/oneGoalById/' + this.props.goalId)
            .then(response => {

                this.setState({
                    goal: response.data,
                    tempGoal: response.data
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
        axios.get('/goals/nazwa/' + this.state.goal.mainGoal)
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
        console.log(this.state.tempGoal);
        return (

            Object
                .keys(this.state.goals)
                .map(key => 
                <button>
                    {this.state.goals[key].name}
                </button>)
        );

    }

    changeColor() {
        this.setState({ color_black: !this.state.color_black })
    }


    render() {
        let bgColor = this.state.color_black ? "red" : "green"
        return (
            <div>
                CelDynamicznie

                    {this.drawGoalsTree()}
            </div>
        )
    }
}
export default CelDynamicznie;