// To jest strona wyświetlacjąca cele główne
import React from 'react';
import axios from 'axios';
import CelSzczegoly from './CelSzczegoly';


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
        axios.get('/goals/mainGoals/')
            .then(response => {

                this.setState({
                    goals: response.data.products
                });
                console.log(response, 'Znaleziono wszystkie cele');
            })
            .catch(err => {
                console.log(err, 'Goals not found, try again.');
            });
    }

    // Rysowanie głównych celów
    drawGoals() {
        return (
            Object
                .keys(this.state.goals)
                .map(key => <CelSzczegoly key={key} 
                    details={this.state.goals[key]} chooseGoal={this.chooseGoal}/>)
        )
    }

    // przejdź do konketnego celu
    chooseGoal(key) {
        
        {this.props.renderGoal(key)}
        console.log(key);

    }  


    render() {

        return (
            <div>Cele główne
                {this.drawGoals()}
            </div>
        )
    }
}
export default CeleGlowne;