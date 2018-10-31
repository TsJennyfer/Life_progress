// To jest główny element w react
// W nim będą renderowane: header, main, stopka
// Tutaj również są trzymane dane = stany

//import Header from './Header';
import Main from './Main';
//import Footer from './Footer';
//import header from '../resourses/head6.png';
//import StickyHeader from 'react-sticky-header';
import 'react-sticky-header/styles.css';
import feather from '../resourses/feather.png';
import MainPage from './MainPage';
import Protected from './Protected';
import Public from './Public';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';


import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Header from './Header';


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
                <div>
                    <Header />
                    <Route exact path="/" component={Public} />
                    <Route path="/protected" component={Protected} />
                    <Route path="/register" component={Rejestracja} />
                    <Route path="/signin" component={Logowanie} />
                </div>
            </Router>
        )
    }
}

export default MainPage2;