// To jest główny element w react
// W nim będą renderowane: header, main, stopka
// Tutaj również są trzymane dane = stany
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import header from '../resourses/head6.png';

// import StartPage from './StartPage';

class MainPage extends React.Component {
    // konstruktor, tu są inicjowane puste stany=dane
    constructor() {
        super()
        this.state = {
            goals: {}
        }
    }
        render() {
            return (
                <div>
                    <img src={header} width="100%" height="500"/>
                    <div class="fixed-nav-bar">
                        <Header />
                    </div>
                    <div className = "main__container">
                        <Main />
                        <Footer />
                    </div>
                </div>
            )
        }
    }

    export default MainPage;