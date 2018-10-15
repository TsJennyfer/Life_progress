// To jest główny element w react
// W nim będą renderowane: header, main, stopka
// Tutaj również są trzymane dane = stany
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import header from '../resourses/head6.png';
import StickyHeader from 'react-sticky-header';
import 'react-sticky-header/styles.css';
import feather from '../resourses/feather.png';

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
                {/*<StickyHeader
                    className="sticky-header"
                    header={
                        <div>
                            <div className="fixed-nav-bar">
                                <Header />
                            </div>
                        </div>
                    }
                    backgroundImage={header}
                >
                </StickyHeader>*/}
                <div className="main__container">
                    <div class="MyHeader d-flex">
                        <a className="header-logo" href="#">
                            <img src={feather} width="30" height="30" alt="" className="d-inline-block align-top flex-row"></img>
                            <span className="ml-3">LIFE PROGRESS</span>
                        </a>
                        <a className="header-button" href="#">About us</a>
                        <a className="header-button" href="#">Sign in</a>
                        <a className="header-button" href="#">Sign up</a>
                    </div>
                    <Main />
                    <Footer />
                </div>

            </div>
        )
    }
}

export default MainPage;