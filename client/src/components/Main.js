// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
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
        this.logOut = this.logOut.bind(this);
        this.state = {
            celeGlowne: true,
            celSzczegoly: "",
            nowyCelGlowny: false,
            isUserLoggedIn: false
        };
    }
    componentDidMount() {
        this.checkToken();
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
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isUserLoggedIn: true
            });
        } else {
            this.setState({
                isUserLoggedIn: false
            });
        }
    }

    logOut() {
        localStorage.removeItem('token');
        this.checkToken();
    }

    render() {
        if (this.state.isUserLoggedIn) {

            if (this.state.celeGlowne) {
                return (
                    <div>
                        <CeleGlowne renderGoal={this.renderGoal} addMainGoal={this.addMainGoal} />
                        <button className="log-out-button" onClick={() => this.logOut()}>
                            Wyloguj
                            </button>
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
        else if (!this.state.isUserLoggedIn) {
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