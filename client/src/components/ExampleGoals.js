import React from 'react';
import axios from 'axios';

class ExampleGoals extends React.Component {
    constructor(props) {
        super(props);
        this.findSuggestedGoals = this.findSuggestedGoals.bind(this);
        this.displaySuggestedGoals = this.displaySuggestedGoals.bind(this);
        this.state = {
            suggestedGoals: {}
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

    displaySuggestedGoals() {
        return(
        <form>
            <div class="form-group">
                <label for="sel1">Select list (select one):</label>
                <select class="form-control" id="sel1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    {
                        Object.keys(this.state.suggestedGoals).map(key => <option>{this.state.suggestedGoals[key]._id}</option>)
                    }
                </select>
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
