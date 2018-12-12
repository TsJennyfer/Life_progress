// To jest główny element w react
// W nim będą renderowane: header i treść główna
// Tutaj również są trzymane dane = stany
import Protected from './Protected';
import Public from './Public';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import CelDynamicznie2 from './CelDynamicznie2';
import UserProfile from './UserProfile';
import TermsPolicy from './TermsPolicy';

import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from './Header';

class MainPage2 extends React.Component { 
    render() {
        return (
            <Router>
                <div >
                    <Header />
                    <Route exact path="/" component={Public} />
                    <Route exact path="/protected" component={Protected} />
                    <Route path="/register" component={Rejestracja} />
                    <Route path="/signin" component={Logowanie} />
                    <Route exact path="/protected/:goal" component={CelDynamicznie2} />
                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/TermsPolicy" component={TermsPolicy} />
                </div>
            </Router>
        )
    }
}
export default MainPage2;