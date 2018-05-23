// To jest pojedynczy cel ze szczegółami
import React from 'react';
import axios from 'axios';

import '../css/Cele.css';

const Main_goal = () => {
    return (
      <div>
        <center>
          <table>
            <center>
              <tr class="spaceUnder">
                <td colSpan = "4"> <button className='buttonR round'> BIEGANIE </button> </td>
              </tr>
              <tr class="spaceUnder">
                <td colSpan = "3"><button class="buttonR round">TRENINGI</button></td>
                <td><button class="buttonR round">MARATON</button></td>
              </tr>
              <tr>
                <td><button class="buttonR round">PRZEBIEGNIJ<br /> 1KM</button></td>
                <td><button class="buttonR round">PRZEBIEGNIJ<br /> 500M</button></td>
                <td><button class="buttonR round">PRZEBIEGNIJ<br /> 2KM</button></td>
              </tr>
            </center>
          </table>
        </center>
      </div>
    );
  }

  function render_table()
{

  var count = 4;
  for(var i in count)
  {
  }
  return(<b>dddd</b>);
}

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

    changeColor(){
        this.setState({color_black: !this.state.color_black})
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
            <div>
                Cel
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
                <Main_goal />
            </div>
        )
    }
}
export default Cel;