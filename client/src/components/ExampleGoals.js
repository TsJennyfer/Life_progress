import React from 'react';
import axios from 'axios';

class ExampleGoals extends React.Component {
    constructor(props) {
        super(props);
        this.findSuggestedGoals = this.findSuggestedGoals.bind(this);
        this.displaySuggestedGoals = this.displaySuggestedGoals.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addExampleGoal = this.addExampleGoal.bind(this);
        this.state = {
            suggestedGoals: {},
            choosenGoal: 0,
            NewExampleMainGoalId: ''
        };
    }

    componentDidMount() {
        this.findSuggestedGoals();
    }

    // Znalezienie przykładowych celów
    findSuggestedGoals() {
        var headers = {
            'auth': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        axios.get('/suggestedgoals/all', { headers })
            .then(response => {
                this.setState({
                    suggestedGoals: response.data.goals
                });
            });
    }

    handleSelect(event) {
        this.setState({
            choosenGoal: event.target.value
        });
    }

    // dodanie celu głównego i podceli
    addExampleGoal() {
        var headers = {
            'auth': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        axios.post('/goals/', {
            name: this.state.suggestedGoals[this.state.choosenGoal].a,
            parent: null,
            userToken: localStorage.getItem('token')
        },
            { headers })
            .then(response => {
                this.setState({
                    NewExampleMainGoalId: response.data._id
                })
                //console.log(response.data._id, `Example response`);
                alert("Example goal added");

                var payload = {
                    id: response.data._id,
                    subgoals: this.state.suggestedGoals[this.state.choosenGoal]
                }
                console.log(payload);
                axios.post('/goals/ListofGoals',
                    payload
                    , { headers })
                    .then(res => {
                        //console.log(res);
                        // tu późniejszy kod
                    })
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania przykładowego celu');
            });
    }


    // pole select wyboru celu głównego
    displaySuggestedGoals() {
        return (
            <div className="form-group">
                <select className="form-control" onChange={this.handleSelect}>
                    {
                        Object.keys(this.state.suggestedGoals).map((key, index) => <option value={index} key={key} >{this.state.suggestedGoals[key].a}</option>)
                    }
                </select>
                <button className="button-main mt-3" onClick={() => this.addExampleGoal()}>Select</button>
            </div>

        )
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <h2>Or choose from ready list:</h2>
                </div>
                <div className="row justify-content-center">
                    {this.displaySuggestedGoals()}
                </div>
            </div>
        )
    }
}
export default ExampleGoals;
