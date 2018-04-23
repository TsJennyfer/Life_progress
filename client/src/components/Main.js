// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import Cele from './Cele';
import CeleGlowne from './CeleGlowne';

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
                    <CeleGlowne renderGoal={this.renderGoal} />

                </div> 
            )
        } else {
            return (
                <div>
                    <Cel />
                </div>
            )
        }

    }
}

export default Main;