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
                <StickyHeader
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
                </StickyHeader>
<h1>Hello in Life progress</h1>
<br />
Our features
<br />

Easy planning
<br />
Organize tasks
<br />
<button className="button button1"> START PLANNING
</button>
                <div className="main__container">
                    <Main />
                    <Footer />
                </div>

            </div>
        )
    }
}

export default MainPage;