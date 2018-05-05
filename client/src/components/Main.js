// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import Cele from './Cele';
import CeleGlowne from './CeleGlowne';
import CelDynamicznie from './CelDynamicznie';
import Graph from './Graph';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.renderGoal = this.renderGoal.bind(this);
        this.state = {
            celeGlowne: true,
            celSzczegoly: ""
        };
    }

    // renderowanie pojedynczego celu
    renderGoal(goal) {
        
        console.log('renderGoal');
        this.setState({
            celeGlowne: false,
            celSzczegoly: goal
        });
    }

    render() {
        if (this.state.celeGlowne) {
            return (
                <div>
                    Main
                    {/* <Rejestracja />
                    <Cel />
                    <Cele /> */}
                    <Graph />
                    <CeleGlowne renderGoal={this.renderGoal} />


                </div> 
            )
        } else {
            return (
                <div>
                    <CelDynamicznie goalId={this.state.celSzczegoly} />
                </div>
            )
        }

    }
}

export default Main;