
// To jest pojedynczy cel ze szczegółami, który ładuje dynamicznie wszystkie podcele
import React from 'react';
import axios from 'axios';




class CelDynamicznie extends React.Component {
    constructor(props) {
        super(props);

        this.handleGoal = this.handleGoal.bind(this);
        this.findGoal = this.findGoal.bind(this);

        this.state = {
            goals: {},
            inputGoal: ""
        };
    }

    changeColor() {
        this.setState({ color_black: !this.state.color_black })
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

    /*<button class="buttonR round" style={{backgroundColor: bgColor}} onClick={this.changeColor.bind(this)}>Button</button>
    */
    render() {
        let bgColor = this.state.color_black ? "red" : "green"
        return (
            <div>CelDynamicznie


                    <button>
                        {this.props.goalId}
                </button>

            </div>
        )
    }
}
export default CelDynamicznie;