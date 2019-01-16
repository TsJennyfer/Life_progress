// To jest strona wyświetlacjąca cele główne
import React from 'react';

import CelSzczegoly from './CelSzczegoly';
import Remainder from './Remainder';
import CelGlownyForm from './CelGlownyForm';
import ExampleGoals from './ExampleGoals';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';

class CeleGlowne extends React.Component {
    constructor(props) {
        super(props);
        this.findGoals = this.findGoals.bind(this);
        this.drawGoals = this.drawGoals.bind(this);
        this.whichPeriod = this.whichPeriod.bind(this);
        this.drawSortedGoals = this.drawSortedGoals.bind(this);
        this.state = {
            goals: {}
        };
    }

    componentDidMount() {
        this.findGoals();
    }

    // Znalezienie celów
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
    drawGoals(numberOfGroup) {
        return (
            Object
                .keys(this.state.goals)
                .map(key => {
                    if (this.whichPeriod(this.state.goals[key].plannedAt) === numberOfGroup)
                        return <div className="col-12 col-sm-6 col-md-4 col-lg-3 mx-3 my-3" key={key}>  <CelSzczegoly key={key}
                            details={this.state.goals[key]} />
                        </div>
                }
                )
        )
    }

    drawSortedGoals() {
        return (
            <div className="container">
                <div className="row"><h3>This month:</h3></div>
                <div className="row">
                    {this.drawGoals(1)}
                </div>
                <div className="row">
                    <h3>Next month:</h3>
                </div>
                <div className="row">
                    {this.drawGoals(2)}
                </div>
                <div className="row">
                    <h3>Later:</h3>
                </div>
                <div className="row">
                    {this.drawGoals(3)}
                </div>
                <div className="row">
                    <h3>Past:</h3>
                </div>
                <div className="row">
                    {this.drawGoals(0)}
                </div>
            </div>
        )
    }

    whichPeriod(taskDate) {
        var CurrentDate = new Date();
        var nextMonthTimeStamp = Math.floor(CurrentDate.setMonth(CurrentDate.getMonth() + 1));
        var next2MonthTimeStamp = Math.floor(CurrentDate.setMonth(CurrentDate.getMonth() + 2));
        var currentTimeStamp = Math.floor(Date.now()) - 86400000;

        if ((taskDate > currentTimeStamp) && (taskDate < nextMonthTimeStamp)) {
            return 1; // ten miesiąc
        }
        else if ((taskDate > nextMonthTimeStamp) && (taskDate < next2MonthTimeStamp)) {
            return 2; // następny miesiąc 
        }
        else if (taskDate > next2MonthTimeStamp) {
            return 3; // ponad 2 miesiące
        }
        else return 0;  // przeszłe
    }

    render() {
        return (
            <div className="row justify-content-center form-register">
                <div className="container">
                    <div className="background_white">
                        <h2>This is your goal list</h2>
                        <hr />
                        <div className="col-sm-4">
                        {/* <DayPicker
                                disabledDays={new Date()}
                                onDayClick={this.handleDayClick}
                                onDayMouseEnter={this.handleDayMouseEnter}
                        />*/}
                            <Remainder />
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                {this.drawSortedGoals()}
                            </div>  
                            {/*<div className="button-forgot-pass" id="sign-in"> 
                                <Link to=""> <h3>Show your done goals </h3></Link>
                            </div>*/}
                            <CelGlownyForm findGoals={this.findGoals} />
                            <ExampleGoals />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CeleGlowne;
