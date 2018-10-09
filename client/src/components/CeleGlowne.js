// To jest strona wyświetlacjąca cele główne
import React from 'react';
import axios from 'axios';
import CelSzczegoly from './CelSzczegoly';

import '../css/Cele.css';


class CeleGlowne extends React.Component {
    constructor(props) {
        super(props);

        this.findGoals = this.findGoals.bind(this);
        this.drawGoals = this.drawGoals.bind(this);
        this.chooseGoal = this.chooseGoal.bind(this);

        this.state = {
            goals: {},
            choosenGoal: ""
        };
    }

    componentDidMount() {
        this.findGoals();
    }

    // Znalezienie celu
    findGoals() {
        var headers = {
            'auth': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        axios.get('/goals/mainUserGoals', { headers })
            .then(response => {

                this.setState({
                    goals: response.data.goals
                });
                console.log(response, 'Znaleziono wszystkie cele');
            })
            .catch(err => {
                console.log(err, 'Goals not found, try again.');
            });
    } z

    // Rysowanie głównych celów
    drawGoals() {
        return (
            Object
                .keys(this.state.goals)
                .map(key => <div className="col" key={key}>  <CelSzczegoly key={key}
                    details={this.state.goals[key]} chooseGoal={this.chooseGoal} />
                    </div>)
        )
    }

    // przejdź do konketnego celu
    chooseGoal(key) {
        this.props.renderGoal(key)
    }
    // <button class="button-sub-goal" onClick={() => this.props.addMainGoal()}>

    render() {

        return (
            <div>
                <h2>This is your goal list</h2>
                <br />
                <div className="container" >
                    <div className="row">
                        <div className="col">
                            <button className="button-cel-glowny" onClick={() => this.props.addMainGoal()}>
                                <b>+</b>
                                <br />Add goal
                    </button>
                        </div>
                        {this.drawGoals()}

                    </div>
                </div>
            </div>

        )
    }
}
export default CeleGlowne;
