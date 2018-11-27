// To jest komponent z powiadomieniami
import React from 'react';
import axios from 'axios';
import Powiadomienie from './Powiadomienie';

class Remainder extends React.Component {

    constructor(props) {
        super(props);
        this.drawNotes = this.drawNotes.bind(this);
        this.findSubgoals = this.findSubgoals.bind(this);
        this.state = {
            userSubgoals: {}
        };
    }
    componentDidMount() {
        this.findSubgoals();
    }

    findSubgoals() {
        var headers = {
            'auth': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        axios.get('/goals/userSubgoals/', { headers })
            .then(response => {

                this.setState({
                    userSubgoals: response.data.goals
                });
                console.log(response, 'Znaleziono podcele użytkownika');
            })
            .catch(err => {
                console.log(err, 'Błąd, nie znaleziono podcelów.');
            });
    }


    drawNotes() {
        return (
            Object
            .keys(this.state.userSubgoals)
            .map(key => <div><Powiadomienie key={key} details={this.state.userSubgoals[key]} /></div>)
            
        );
    }

    render() {

        return (
            <div>
                {this.drawNotes()}
            </div>
        )
    }
}

export default Remainder;