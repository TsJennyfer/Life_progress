// To jest główny element w react
// W nim będą renderowane: header, main, stopka
// Tutaj również są trzymane dane = stany
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'

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
                    <Header />
                    <Main />
                    <Footer />
                </div>
            )
        }
    }

    export default MainPage;