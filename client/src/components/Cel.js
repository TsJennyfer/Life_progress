// To jest pojedynczy cel w liście celi
import React from 'react';
import axios from 'axios';

class Cel extends React.Component {
    constructor(props) {
        super(props);

        this.handleGoal = this.handleGoal.bind(this);
        this.findGoal = this.findGoal.bind(this);

        this.state = {
            goals: {},
            inputGoal: ""

        };
    }

    handleGoal(event) {
        this.setState({ inputGoal: event.target.value });
    }

    //Znalezienie celu
    findGoal(event) {
        event.preventDefault();


        axios.get('/goals/' + this.state.inputGoal, {
            goal: this.state.inputGoal
        })
            .then(response => {

                this.setState({
                    goals: response.data
                });
                console.log(response, 'Goal found!');
            })
            .catch(err => {
                console.log(err, 'Goal not found, try again.');
            });

    }


    render() {

        return (
            <div>Cel
                <form className="FindGoalForm" onSubmit={this.findGoal}>
                    <input
                        onChange={this.handleGoal}
                        name="goal"
                        type="text"
                        className="GoalinputForm"
                        value={this.state.inputGoal}
                        placeholder="Enter your goal"
                    />

                    <button
                        className="submitgoal"
                        type="submit"
                    >
                        Znajdź cel<i className="SubmitGoal" aria-hidden="true" />
                    </button>
                </form>
            </div>
        )
    }
}
export default Cel;