// To jest strona wyświetlacjąca cele główne
import React from 'react';
import axios from 'axios';
import CelSzczegoly from './CelSzczegoly';

import '../css/Cele.css';
import CelGlownyForm from './CelGlownyForm';


class CeleGlowne extends React.Component {
    constructor(props) {
        super(props);

        this.findGoals = this.findGoals.bind(this);
        this.drawGoals = this.drawGoals.bind(this);

        this.state = {
            goals: {}
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
                console.log(err, 'Błąd, nie znaleziono celów.');
            });
    }

    // Rysowanie głównych celów
    drawGoals() {
        return (
            Object
                .keys(this.state.goals)
                .map(key => <div className="col-12 col-sm-4 col-md-3 col-lg-2 mx-3 my-3" key={key}>  <CelSzczegoly key={key}
                    details={this.state.goals[key]} />
                </div>)
        )
    }
 

    render() {
        return (
            <div className="row">
                <div className="background_grey">  
                    <div className="container">
                        <div className= "background_white">
                        {/*  <div class="col-sm-4">.col-sm-4</div> */}
                        {/*  <div class="col-sm-8">.col-sm-8 */}
                            <h2>This is your goal list</h2>
                            <hr />
                        <div className="row">
                            {this.drawGoals()}
                        </div>
                            <CelGlownyForm findGoals={this.findGoals} />        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CeleGlowne;
