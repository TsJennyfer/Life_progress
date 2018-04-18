// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';

class Main extends React.Component {
    render() {
        return (
            <div>
                Main
                <Rejestracja />

            </div>
        )
    }
}

export default Main;