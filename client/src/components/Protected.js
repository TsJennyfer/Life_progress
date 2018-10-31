// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import CeleGlowne from './CeleGlowne';
import CelDynamicznie from './CelDynamicznie';
import CelFormularz from './CelFormularz';
import CelGlownyForm from './CelGlownyForm';
// import Graph from './Graph';
//import icon from '../resourses/done_icon.png';


class Protected extends React.Component {

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
                            Sign out
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
                <div className="container">
                    <div className="row justify-content-center welcome">
                        <div className="col-8 ml-5">
                            <h1>Welcome to</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-8 ml-5">
                            <h1> Life progress</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-3">
                            <h3>Planning aplication to<br /> organize...</h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <button className="button-get-started">
                                <span>Get started</span>
                            </button>
                        </div>
                    </div>

                    <Rejestracja />
                    <Logowanie checkToken={this.checkToken} />
                </div>
            )
        }
    }
}

export default Protected;