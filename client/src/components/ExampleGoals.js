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
            choosenGoal: 0
        };
    }

    componentDidMount() {
        this.findSuggestedGoals();
    }

    // Znalezienie celów
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
                console.log(response, 'Pobrano przykładowe cele');
            })
            .catch(err => {
                console.log(err, 'Błąd');
            });
    }

    handleSelect(event) {
        this.setState({
            choosenGoal: event.target.value
        });
    }

    addExampleGoal() {

    }

    displaySuggestedGoals() {
        return(
        <form onSubmit={this.addExampleGoal}>
            <div className="form-group">
                <select className="form-control" onChange={this.handleSelect}>
                    {
                        Object.keys(this.state.suggestedGoals).map((key, index) => <option value={index}>{this.state.suggestedGoals[key]._id}</option>)
                    }
                </select>
                <button className="button-main mt-3" type="submit">Select</button>
            </div>
        </form>
        )
    }


    render() {
        return (
            <div className="row justify-content-center form-register">
                <h2>Or choose from ready list:</h2>
                {this.displaySuggestedGoals()}
            </div>
        )
    }
}
export default ExampleGoals;
