// To jest główny element w react
// W nim będą renderowane: header, main, stopka
// Tutaj również są trzymane dane = stany
//import StickyHeader from 'react-sticky-header';
import 'react-sticky-header/styles.css';
import Protected from './Protected';
import Public from './Public';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import CelDynamicznie2 from './CelDynamicznie2';
import UserProfile from './UserProfile';
import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Header from './Header';
import backgroundPattern from '../resourses/square_bg.png';


class MainPage2 extends React.Component {
    // konstruktor, tu są inicjowane puste stany=dane
    constructor(props, context) {
        super()
        this.state = {
            goals: {}
        }
    }

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
                </div>
            </Router>
        )
    }
}

export default MainPage2;