// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import Wylogowanie from './Wylogowanie';
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
        this.checkToken = this.checkToken.bind(this);
        this.state = {
            celeGlowne: true,
            celSzczegoly: "",
            nowyCelGlowny: false,
            isUserLoggedIn: false,
            userToken: localStorage.getItem('token')
        };
    }
    componentDidMount() {
        if(this.state.userToken != "") {
            this.setState({
                isUserLoggedIn: true
            });
        }
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

    checkToken() {
        this.setState({
            userToken: localStorage.getItem('token')
        });
        if(this.state.userToken != "") {
            this.setState({
                isUserLoggedIn: true
            });
        }
    }

    render() {
        if (this.state.isUserLoggedIn) {

            if (this.state.celeGlowne) {
                return (
                    <div>
                        Main
                    <CeleGlowne renderGoal={this.renderGoal} addMainGoal={this.addMainGoal} />
                        <Rejestracja />
                        <Logowanie  />
                        <Wylogowanie />
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
        // użytkownik niezalogowany
        else {
            return (
                <div>
                    <Rejestracja />
                    <Logowanie checkToken={this.checkToken} />
                    <Wylogowanie />
                </div>
            )
        }
    }
}

export default Main;