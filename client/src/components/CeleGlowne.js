// To jest strona wyświetlacjąca cele główne
import React from 'react';
import axios from 'axios';

class Cele extends React.Component {
    constructor(props) {
        super(props);

        this.findGoal = this.findGoal.bind(this);

        this.state = {
            goals: {}
        };
    }

    componentDidMount() {
        this.findGoal();
    }

    //Znalezienie celu
    findGoal() {
        axios.get('/goals/')
            .then(response => {

                this.setState({
                    goals: response.data
                });
                console.log(response, 'Znaleziono wszystkie cele');
            })
            .catch(err => {
                console.log(err, 'Goals not found, try again.');
            });

    }


    render() {

        return (
            <div>Cele główne
                
            </div>
        )
    }
}
export default CeleGlowne;