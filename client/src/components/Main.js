// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import CeleGlowne from './CeleGlowne';
import CelDynamicznie from './CelDynamicznie';
import CelFormularz from './CelFormularz';
import CelGlownyForm from './CelGlownyForm';
// import Graph from './Graph';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.renderGoal = this.renderGoal.bind(this);
        this.addMainGoal = this.addMainGoal.bind(this);
        this.state = {
            celeGlowne: true,
            celSzczegoly: "",
            nowyCelGlowny: false
        };
    }

    // renderowanie pojedynczego celu
    renderGoal(goal) {

        console.log('renderGoal');
        this.setState({
            celeGlowne: false,
            celSzczegoly: goal,
            nowyCelGlowny: false
        });
    }

    // renderowanie okna dodawania nowego celu głównego
    addMainGoal() {
        this.setState({
            nowyCelGlowny: true,
            celeGlowne: false,
            celSzczegoly: ""
        })
    }

    render() {
        if (this.state.celeGlowne) {
            return (
                <div>
                    Main
                    {/* <Rejestracja />
                    <Cel />
                    <Cele /> */}
                    {/* <Graph /> */}
                    <CeleGlowne renderGoal={this.renderGoal} addMainGoal={this.addMainGoal} />


                </div>
            )
        } else if (this.state.nowyCelGlowny) {
            return (
                <div>
                    <CelFormularz />
                    <br />
                    <CelGlownyForm />
                </div>
            )
        }

        else {
            return (
                <div>
                    <CelDynamicznie goalId={this.state.celSzczegoly} />
                </div>
            )
        }

    }
}

export default Main;