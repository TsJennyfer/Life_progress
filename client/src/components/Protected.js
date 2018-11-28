// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import CeleGlowne from './CeleGlowne';
import CelGlownyForm from './CelGlownyForm';
import Remainder from './Remainder';

class Protected extends React.Component {

    constructor(props) {
        super(props);

        this.checkToken = this.checkToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
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
            return (
                <div>
                    <CeleGlowne />
                </div>
            )
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