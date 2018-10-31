// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import CeleGlowne from './CeleGlowne';
import CelDynamicznie from './CelDynamicznie';
import CelGlownyForm from './CelGlownyForm';

class Protected extends React.Component {

    constructor(props) {
        super(props);

        this.checkToken = this.checkToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            celeGlowne: true,
            celSzczegoly: "",
            nowyCelGlowny: false,
            isUserLoggedIn: true
        };
    }
    componentDidMount() {
        this.checkToken();
    }
    // przekierowanie do strony dla niezalogowanych
    goToPublic() {
        this.props.history.push('/');
    }

    // sprawdzenie czy jest token
    checkToken() {
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isUserLoggedIn: true
            });
        } else {
            this.setState({
                isUserLoggedIn: false
            });
            this.props.history.push('/');
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
                        <CeleGlowne />
                        <button className="log-out-button" onClick={() => this.logOut()}>
                            Sign out
                            </button>
                    </div>
                )
            } else if (this.state.nowyCelGlowny) {
                return (
                    <div>
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
                    {this.goToPublic()}
                </div>
            )
        }
    }
}

export default Protected;